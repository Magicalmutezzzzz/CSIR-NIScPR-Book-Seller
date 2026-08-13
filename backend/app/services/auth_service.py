from sqlalchemy.orm import Session

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)
from app.models.user import User
from app.repositories.user_repository import UserRepository


class AuthService:

    def __init__(self, db: Session):
        self.repo = UserRepository(db)

    def register(
    self,
    full_name: str,
    email: str,
    password: str,
):

        if self.repo.get_by_email(email):
            raise ValueError("Email already exists.")

        customer_role = self.repo.get_role_by_name("Customer")

        if not customer_role:
            raise ValueError("Customer role not found.")

        user = User(
            full_name=full_name,
            email=email,
            password_hash=hash_password(password),
            role_id=customer_role.id,
        )

        return self.repo.create(user)

    def login(
        self,
        email: str,
        password: str,
    ):

        user = self.repo.get_by_email(email)

        if not user:
            raise ValueError("Invalid email or password.")

        if not verify_password(
            password,
            user.password_hash,
        ):
            raise ValueError("Invalid email or password.")

        return create_access_token(
            subject=str(user.id),
            email=user.email,
            role=user.role.name,
        )
    def admin_login(
        self,
        email: str,
        password: str,
    ):

        user = self.repo.get_by_email(email)

        if not user:
            raise ValueError("Invalid email or password.")

        if not verify_password(
            password,
            user.password_hash,
        ):
            raise ValueError("Invalid email or password.")

        if (
            not user.role
            or user.role.name.lower() != "admin"
        ):
            raise ValueError(
                "You are not authorized as an admin."
            )

        return create_access_token(
            subject=str(user.id),
            email=user.email,
            role=user.role.name,
        )
