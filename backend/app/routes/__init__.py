from fastapi import FastAPI

from app.routes.auth import router as auth_router
from app.routes.category import router as category_router
from app.routes.publisher import router as publisher_router
from app.routes.user import router as user_router

from app.routes.publication import router as publication_router

from app.routes.publication_image import router as publication_image_router

from app.routes.publication_category import (
    router as publication_category_router,
)

from app.routes.subscription_plan import (
    router as subscription_plan_router,
)

from app.routes.publication_type import (
    router as publication_type_router,
)

from app.routes.order import router as order_router

from app.routes.admin import router as admin_router

from app.routes.admin_dashboard import (
    router as admin_dashboard_router,
)

def register_routes(app: FastAPI):

    app.include_router(
        auth_router,
        prefix="/api/v1",
    )

    app.include_router(
        publisher_router,
        prefix="/api/v1",
    )
    
    app.include_router(
        category_router,
        prefix="/api/v1",
    )

    app.include_router(
        user_router,
        prefix="/api/v1",
    )
    app.include_router(
        publication_router,
        prefix="/api/v1",
    )
    app.include_router(
        publication_image_router,
        prefix="/api/v1",
    )
    app.include_router(
        subscription_plan_router,
        prefix="/api/v1",
    )
    app.include_router(
        publication_category_router,
        prefix="/api/v1",
    )
    app.include_router(
        order_router,
        prefix="/api/v1",
    )
    app.include_router(
        admin_router,
        prefix="/api/v1",
    )
    app.include_router(
        admin_dashboard_router,
        prefix="/api/v1",
    )
    app.include_router(
        publication_type_router,
        prefix="/api/v1",
    )