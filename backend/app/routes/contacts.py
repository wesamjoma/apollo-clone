from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter()


@router.post("/import", response_model=schemas.ImportHistoryOut, status_code=201)
def import_contacts(
    payload: schemas.ImportHistoryCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    history = models.ImportHistory(
        user_id=current_user.id,
        filename=payload.filename,
        total_records=payload.total_records,
        skipped=payload.skipped,
        uploaded_by=payload.uploaded_by or current_user.full_name,
    )
    db.add(history)

    for c in payload.contacts:
        contact = models.Contact(user_id=current_user.id, **c.model_dump())
        db.add(contact)

    db.commit()
    db.refresh(history)
    return history


@router.get("/", response_model=List[schemas.ContactOut])
def get_contacts(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    return db.query(models.Contact).filter(models.Contact.user_id == current_user.id).all()


@router.get("/imports", response_model=List[schemas.ImportHistoryOut])
def get_import_history(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(models.ImportHistory)
        .filter(models.ImportHistory.user_id == current_user.id)
        .order_by(models.ImportHistory.created_at.desc())
        .all()
    )
