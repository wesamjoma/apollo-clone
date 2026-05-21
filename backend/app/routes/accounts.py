from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, auth
from ..database import get_db

router = APIRouter()


@router.post("/import", response_model=schemas.ImportHistoryOut, status_code=201)
def import_accounts(
    payload: schemas.AccountImportCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    history = models.ImportHistory(
        user_id=current_user.id,
        filename=payload.filename,
        import_type="account",
        total_records=payload.total_records,
        skipped=payload.skipped,
        uploaded_by=payload.uploaded_by or current_user.full_name,
    )
    db.add(history)

    for a in payload.accounts:
        account = models.Account(user_id=current_user.id, **a.model_dump())
        db.add(account)

    db.commit()
    db.refresh(history)
    return history


@router.get("/", response_model=List[schemas.AccountOut])
def get_accounts(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db),
):
    return db.query(models.Account).filter(models.Account.user_id == current_user.id).all()
