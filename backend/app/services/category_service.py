from uuid import UUID

from fastapi import HTTPException, status
from slugify import slugify

from app.models.category import Category
from app.repositories.category_repository import CategoryRepository
from app.schemas.category import CategoryCreate, CategoryUpdate


class CategoryService:
    def __init__(self, repository: CategoryRepository):
        self.repository = repository

    def create_category(self, data: CategoryCreate) -> Category:
        if self.repository.get_by_name(data.name):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category already exists.",
            )

        slug = slugify(data.name)

        if self.repository.get_by_slug(slug):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category slug already exists.",
            )

        category = Category(
            name=data.name,
            slug=slug,
            description=data.description,
            image_url=data.image_url,
            display_order=data.display_order,
            is_active=data.is_active,
        )

        return self.repository.create(category)

    def get_all_categories(self) -> list[Category]:
        return self.repository.get_all()

    def get_category(self, category_id: UUID) -> Category:
        category = self.repository.get_by_id(category_id)

        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found.",
            )

        return category

    def update_category(
        self,
        category_id: UUID,
        data: CategoryUpdate,
    ) -> Category:
        category = self.get_category(category_id)

        update_data = data.model_dump(exclude_unset=True)

        if "name" in update_data:

            existing = self.repository.get_by_name(update_data["name"])

            if existing and existing.id != category.id:
                raise HTTPException( 
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Category already exists.",
                )

            update_data["slug"] = slugify(update_data["name"])

        for key, value in update_data.items():
            setattr(category, key, value)

        return self.repository.update(category)

    def delete_category(self, category_id: UUID) -> None:
        category = self.get_category(category_id)
        self.repository.delete(category)