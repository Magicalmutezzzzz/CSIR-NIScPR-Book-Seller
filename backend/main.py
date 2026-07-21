from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CSIR-NIScPR Publications API",
    version="1.0.0",
    description="Backend API for CSIR-NIScPR Online Publications Platform"
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "CSIR-NIScPR Publications API Running 🚀"
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "database": "Not Connected Yet",
        "version": "1.0.0"
    }