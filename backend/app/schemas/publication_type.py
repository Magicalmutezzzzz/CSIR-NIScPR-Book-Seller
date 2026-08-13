from uuid import UUID

from pydantic import BaseModel
from pydantic import ConfigDict


class PublicationTypeResponse(BaseModel):

    id: UUID

    name: str

    description: str | None = None

    model_config = ConfigDict(
        from_attributes=True,
    )