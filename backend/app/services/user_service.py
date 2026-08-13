from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UpdateUserProfileRequest


class UserService:

    def __init__(self, repository: UserRepository):
        self.repository = repository

    def get_profile(self, current_user: User):
        return current_user

    def update_profile(
        self,
        current_user: User,
        data: UpdateUserProfileRequest,
    ):

        update_data = data.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(current_user, key, value)

        return self.repository.update(
            current_user
        )