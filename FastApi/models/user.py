# models/user.py
from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base # Giả định Base được định nghĩa ở database.py

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(255))
    role = Column(String(50))
    is_active = Column(Boolean, default=True)
    
    # Quan hệ: Sử dụng tên bảng/class
    courses = relationship("Course", back_populates="owner")
    # ... thêm các quan hệ khác ...