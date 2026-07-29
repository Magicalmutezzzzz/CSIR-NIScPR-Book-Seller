from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.init_db import check_database
from app.routes.auth import router as auth_router

from app.routes.publisher import router as publisher_router

app = FastAPI(
    title="CSIR-NIScPR Publications API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    prefix="/api/v1",
)

@app.on_event("startup")
def startup():
    check_database()

@app.get("/")
def root():
    return {
        "message": "CSIR-NIScPR Publications API Running 🚀"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "database": "connected"
    }

app.include_router(
    publisher_router,
    prefix="/api/v1/publishers",
    tags=["Publishers"],
)