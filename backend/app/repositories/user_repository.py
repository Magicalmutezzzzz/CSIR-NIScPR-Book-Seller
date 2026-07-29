from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.models.role import Role


class UserRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str):
        return self.db.scalar(
            select(User).where(User.email == email)
        )

    def get_role_by_name(self, name: str):
        return self.db.scalar(
            select(Role).where(Role.name == name)
        )

    def create(self, user: User):
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user