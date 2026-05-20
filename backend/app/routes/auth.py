from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter()


@router.post("/register", response_model=schemas.Token, status_code=201)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if auth.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    db_user = models.User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=auth.get_password_hash(user.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    token = auth.create_access_token(data={"sub": db_user.email})
    return {"access_token": token, "token_type": "bearer", "user": db_user}


@router.post("/login", response_model=schemas.Token)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer", "user": user}


@router.get("/me", response_model=schemas.UserOut)
def get_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user


@router.put("/change-email", response_model=schemas.Token)
def change_email(
    payload: schemas.ChangeEmailRequest,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    if not auth.verify_password(payload.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")

    if payload.new_email == current_user.email:
        raise HTTPException(status_code=400, detail="New email must differ from current email")

    if auth.get_user_by_email(db, payload.new_email):
        raise HTTPException(status_code=400, detail="Email already in use")

    current_user.email = payload.new_email
    db.commit()
    db.refresh(current_user)

    token = auth.create_access_token(data={"sub": current_user.email})
    return {"access_token": token, "token_type": "bearer", "user": current_user}
