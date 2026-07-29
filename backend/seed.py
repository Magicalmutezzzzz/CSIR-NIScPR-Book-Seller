"""Create temporary local accounts for development.

Run from the ``backend`` directory with ``venv/bin/python seed.py``.
"""

from sqlalchemy import select

from app.core.security import hash_password
from app.database.session import SessionLocal
from app.models.role import Role
from app.models.user import User


TEMPORARY_ACCOUNTS = (
    {
        "role": "admin",
        "role_description": "Temporary administrator account",
        "full_name": "Temporary Admin",
        "email": "admin@niscpr.local",
        "password": "Admin@123",
    },
    {
        "role": "customer",
        "role_description": "Temporary customer account",
        "full_name": "Temporary Customer",
        "email": "customer@niscpr.local",
        "password": "Customer@123",
    },
)


def seed_temporary_accounts() -> None:
    """Create or reset the development admin and customer accounts."""
    db = SessionLocal()
    try:
        roles: dict[str, Role] = {}
        for account in TEMPORARY_ACCOUNTS:
            role_name = account["role"]
            role = roles.get(role_name)
            if role is None:
                role = db.scalar(select(Role).where(Role.name == role_name))
                if role is None:
                    role = Role(
                        name=role_name,
                        description=account["role_description"],
                    )
                    db.add(role)
                    db.flush()
                roles[role_name] = role

            user = db.scalar(select(User).where(User.email == account["email"]))
            if user is None:
                user = User(
                    full_name=account["full_name"],
                    email=account["email"],
                    password_hash=hash_password(account["password"]),
                    role_id=role.id,
                    is_verified=True,
                    is_active=True,
                )
                db.add(user)
            else:
                user.full_name = account["full_name"]
                user.password_hash = hash_password(account["password"])
                user.role_id = role.id
                user.is_verified = True
                user.is_active = True

        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_temporary_accounts()
    print("Temporary accounts seeded:")
    for account in TEMPORARY_ACCOUNTS:
        print(f"- {account['role']}: {account['email']} / {account['password']}")
