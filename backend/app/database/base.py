from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


from app.models.role import Role  # noqa: F401,E402
from app.models.user import User  # noqa: F401,E402