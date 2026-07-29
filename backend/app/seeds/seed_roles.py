from sqlalchemy import select

from app.database.session import SessionLocal
from app.models.role import Role

db = SessionLocal()

roles = [
    {
        "name": "Admin",
        "description": "System Administrator",
    },
    {
        "name": "Customer",
        "description": "Default Customer",
    },
]

for role in roles:
    exists = db.scalar(
        select(Role).where(Role.name == role["name"])
    )

    if not exists:
        db.add(Role(**role))

db.commit()

print("Roles seeded successfully.")