from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.publisher import PublisherCreate, PublisherResponse, PublisherUpdate
from app.services.publisher_service import PublisherService
from app.repositories.publisher_repository import PublisherRepository

router = APIRouter()


def get_service(db: Session) -> PublisherService:
    return PublisherService(PublisherRepository(db))


@router.post("/", response_model=PublisherResponse, status_code=status.HTTP_201_CREATED)
def create_publisher(
    data: PublisherCreate,
    db: Session = Depends(get_db),
):
    return get_service(db).create(data)


@router.get("/", response_model=list[PublisherResponse])
def get_publishers(db: Session = Depends(get_db)):
    return get_service(db).get_all()


@router.get("/{publisher_id}", response_model=PublisherResponse)
def get_publisher(publisher_id: UUID, db: Session = Depends(get_db)):
    return get_service(db).get_by_id(publisher_id)


@router.put("/{publisher_id}", response_model=PublisherResponse)
def update_publisher(
    publisher_id: UUID,
    data: PublisherUpdate,
    db: Session = Depends(get_db),
):
    return get_service(db).update(publisher_id, data)


@router.delete("/{publisher_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_publisher(publisher_id: UUID, db: Session = Depends(get_db)):
    get_service(db).delete(publisher_id)
