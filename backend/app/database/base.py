from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


from app.models.role import Role
from app.models.user import User

from app.models.publication import Publication
from app.models.publication_type import PublicationType
from app.models.author import Author
from app.models.category import Category
from app.models.publication_author import PublicationAuthor
from app.models.publication_category import PublicationCategory
from app.models.publication_image import PublicationImage
from app.models.subscription_plan import SubscriptionPlan