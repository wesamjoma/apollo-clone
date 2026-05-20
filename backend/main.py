import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routes import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Apollo Clone API")

# ALLOWED_ORIGIN env var lets us set the deployed frontend URL on the server.
# Falls back to localhost for local development.
allowed_origin = os.getenv("ALLOWED_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[allowed_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])

@app.get("/")
def root():
    return {"message": "Apollo Clone API running"}
