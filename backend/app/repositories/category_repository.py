from uuid import UUID

from sqlalchemy.orm import Session

from app.models.category import Category


class CategoryRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, category: Category) -> Category:
        self.db.add(category)
        self.db.commit()
        self.db.refresh(category)
        return category

    def get_by_id(self, category_id: UUID) -> Category | None:
        return (
            self.db.query(Category)
            .filter(Category.id == category_id)
            .first()
        )

    def get_by_name(self, name: str) -> Category | None:
        return (
            self.db.query(Category)
            .filter(Category.name == name)
            .first()
        )

    def get_by_slug(self, slug: str) -> Category | None:
        return (
            self.db.query(Category)
            .filter(Category.slug == slug)
            .first()
        )

    def get_all(self) -> list[Category]:
        return (
            self.db.query(Category)
            .order_by(Category.display_order, Category.name)
            .all()
        )

    def update(self, category: Category) -> Category:
        self.db.commit()
        self.db.refresh(category)
        return category

    def delete(self, category: Category) -> None:
        self.db.delete(category)
        self.db.commit()