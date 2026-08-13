from uuid import UUID
from decimal import Decimal

from fastapi import HTTPException, status
from slugify import slugify

from app.models.publication import Publication
from app.repositories.publication_repository import PublicationRepository
from app.schemas.publication import (
    PublicationCreate,
    PublicationUpdate,
)


class PublicationService:

    def __init__(
        self,
        repository: PublicationRepository,
    ):
        self.repository = repository

    def create_publication(
        self,
        data: PublicationCreate,
    ) -> Publication:

        slug = slugify(data.title)

        if self.repository.get_by_slug(slug):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Publication already exists.",
            )

        if data.isbn:
            if self.repository.get_by_isbn(data.isbn):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="ISBN already exists.",
                )

        publication = Publication(
            title=data.title,
            subtitle=data.subtitle,
            slug=slug,
            description=data.description,
            author=data.author,
            keywords=data.keywords,

            publication_type_id=data.publication_type_id,
            publisher_id=data.publisher_id,

            isbn=data.isbn,
            issn=data.issn,
            doi=data.doi,
            sku=data.sku,

            price=data.price,
            discount_price=data.discount_price,
            stock=data.stock,

            language=data.language,
            format=data.format,
            edition=data.edition,
            pages=data.pages,
            publication_date=data.publication_date,

            cover_image=data.cover_image,
            pdf_preview=data.pdf_preview,

            is_featured=data.is_featured,
            is_active=data.is_active,
        )   

        # Attach categories
        if data.category_ids:
            categories = self.repository.get_categories_by_ids(
                data.category_ids
            )

            if len(categories) != len(data.category_ids):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="One or more selected categories were not found.",
                )

            publication.categories = categories

        return self.repository.create(
            publication
        )

    def get_all_publications(
        self,
    ) -> list[Publication]:

        return self.repository.get_all()

    def get_publication(
        self,
        publication_id: UUID,
    ) -> Publication:

        publication = self.repository.get_by_id(
            publication_id
        )

        if not publication:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Publication not found.",
            )

        return publication

    def update_publication(
        self,
        publication_id: UUID,
        data: PublicationUpdate,
    ) -> Publication:

        publication = self.get_publication(
            publication_id
        )

        update_data = data.model_dump(
            exclude_unset=True,
        )

        if "title" in update_data:
            update_data["slug"] = slugify(
                update_data["title"]
            )

        if "isbn" in update_data:
            isbn = update_data["isbn"]

            if isbn:
                existing = self.repository.get_by_isbn(
                    isbn
                )

                if (
                    existing
                    and existing.id != publication.id
                ):
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail="ISBN already exists.",
                    )

        category_ids = update_data.pop(
            "category_ids",
            None,
        )

        for key, value in update_data.items():
            setattr(
                publication,
                key,
                value,
            )

        if category_ids is not None:

            categories = self.repository.get_categories_by_ids(
                category_ids
            )

            if len(categories) != len(category_ids):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="One or more selected categories were not found.",
                )

            publication.categories = categories

        return self.repository.update(
            publication
        )

    def delete_publication(
        self,
        publication_id: UUID,
    ) -> None:

        publication = self.get_publication(
            publication_id
        )

        self.repository.delete(
            publication
        )

    def search_publications(
        self,
        page: int = 1,
        limit: int = 12,
        search: str | None = None,
        featured: bool | None = None,
        latest: bool = False,
        in_stock: bool | None = None,
        min_price: Decimal | None = None,
        max_price: Decimal | None = None,
    ):

        return self.repository.search(
            page=page,
            limit=limit,
            search=search,
            featured=featured,
            latest=latest,
            in_stock=in_stock,
            min_price=min_price,
            max_price=max_price,
        )