from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.init_db import check_database
from app.routes import register_routes

app = FastAPI(
    title="CSIR-NIScPR Publications API",
    version="1.0.0",
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://csir-niscpr-book-seller-1.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_routes(app)

@app.on_event("startup")
def startup():
    check_database()

@app.get("/")
def root():
    return {"message": "CSIR-NIScPR Publications API Running 🚀"}

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "database": "connected",
    }
