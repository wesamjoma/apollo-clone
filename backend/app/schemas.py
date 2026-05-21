from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut


class TokenData(BaseModel):
    email: Optional[str] = None


class ChangeEmailRequest(BaseModel):
    new_email: EmailStr
    current_password: str


class ContactCreate(BaseModel):
    first_name: str = ""
    last_name: str = ""
    title: str = ""
    company: str = ""
    email: str = ""
    phone: str = ""
    stage: str = ""
    linkedin: str = ""
    twitter: str = ""
    website: str = ""
    city: str = ""
    country: str = ""
    department: str = ""
    mobile: str = ""


class ContactOut(ContactCreate):
    id: int
    user_id: int
    created_at: datetime

    model_config = {"from_attributes": True}


class ImportHistoryCreate(BaseModel):
    filename: str
    import_type: str = "contact"
    total_records: int
    skipped: int = 0
    uploaded_by: str = ""
    contacts: List[ContactCreate] = []


class ImportHistoryOut(BaseModel):
    id: int
    user_id: int
    filename: str
    import_type: str
    total_records: int
    skipped: int
    uploaded_by: str
    created_at: datetime

    model_config = {"from_attributes": True}


class AccountCreate(BaseModel):
    name: str = ""
    domain: str = ""
    industry: str = ""
    employee_count: str = ""
    city: str = ""
    country: str = ""
    phone: str = ""
    linkedin: str = ""
    description: str = ""
    founded_year: str = ""


class AccountOut(AccountCreate):
    id: int
    user_id: int
    created_at: datetime

    model_config = {"from_attributes": True}


class AccountImportCreate(BaseModel):
    filename: str
    total_records: int
    skipped: int = 0
    uploaded_by: str = ""
    accounts: List[AccountCreate]
