from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core.config import settings
from app.database.session import get_db
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login"
)

def get_current_user(

    token: str = Depends(oauth2_scheme),

    db: Session = Depends(get_db),

) -> User:

    credentials_exception = HTTPException(

        status_code=status.HTTP_401_UNAUTHORIZED,

        detail="Could not validate credentials",

        headers={"WWW-Authenticate": "Bearer"},

    )

    try:

        payload = jwt.decode(

            token,

            settings.SECRET_KEY,

            algorithms=[settings.ALGORITHM],

        )

        user_id = payload.get("sub")

        if user_id is None:

            raise credentials_exception

    except JWTError as e:

        print("JWT ERROR:", e)

        raise credentials_exception

    user = db.get(User, UUID(user_id))

    if user is None:

        raise credentials_exception

    return user

def get_current_admin(
    current_user: User = Depends(get_current_user),
) -> User:

    if (
        not current_user.role
        or current_user.role.name.lower() != "admin"
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required.",
        )

    return current_user


def get_current_customer(
    current_user: User = Depends(get_current_user),
) -> User:

    if (
        not current_user.role
        or current_user.role.name.lower() != "customer"
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Customer access required.",
        )

    return current_user