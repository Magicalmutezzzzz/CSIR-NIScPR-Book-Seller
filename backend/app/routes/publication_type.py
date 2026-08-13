from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.repositories.publication_type_repository import (
    PublicationTypeRepository,
)

from app.services.publication_type_service import (
    PublicationTypeService,
)

from app.schemas.publication_type import (
    PublicationTypeResponse,
)

router = APIRouter(
    prefix="/publication-types",
    tags=["Publication Types"],
)


def get_service(
    db: Session = Depends(get_db),
):

    repository = PublicationTypeRepository(db)

    return PublicationTypeService(repository)


@router.get(
    "",
    response_model=list[PublicationTypeResponse],
)
def get_publication_types(
    service: PublicationTypeService = Depends(
        get_service,
    ),
):

    return service.get_all_publication_types()