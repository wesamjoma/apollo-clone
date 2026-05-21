from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    first_name = Column(String, default="")
    last_name = Column(String, default="")
    title = Column(String, default="")
    company = Column(String, default="")
    email = Column(String, default="")
    phone = Column(String, default="")
    stage = Column(String, default="")
    linkedin = Column(String, default="")
    twitter = Column(String, default="")
    website = Column(String, default="")
    city = Column(String, default="")
    country = Column(String, default="")
    department = Column(String, default="")
    mobile = Column(String, default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String, default="")
    domain = Column(String, default="")
    industry = Column(String, default="")
    employee_count = Column(String, default="")
    city = Column(String, default="")
    country = Column(String, default="")
    phone = Column(String, default="")
    linkedin = Column(String, default="")
    description = Column(String, default="")
    founded_year = Column(String, default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ImportHistory(Base):
    __tablename__ = "import_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    filename = Column(String, nullable=False)
    import_type = Column(String, default="contact", server_default="contact")
    total_records = Column(Integer, default=0)
    skipped = Column(Integer, default=0)
    uploaded_by = Column(String, default="")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
