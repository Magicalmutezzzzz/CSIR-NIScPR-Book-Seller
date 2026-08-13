from app.repositories.publication_type_repository import (
    PublicationTypeRepository,
)


class PublicationTypeService:

    def __init__(
        self,
        repository: PublicationTypeRepository,
    ):
        self.repository = repository

    def get_all_publication_types(self):
        return self.repository.get_all()