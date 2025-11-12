from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime # Thường được dùng cho các trường thời gian (nếu có)

# 1. Schemas cho User
# --------------------

class UserBase(BaseModel):
    """Schema cơ bản dùng cho tạo và cập nhật."""
    name: str
    email: EmailStr # EmailStr đảm bảo định dạng email hợp lệ
    role: Optional[str] = "student"
class UserCreate(UserBase):
    """Schema dùng khi tạo User mới"""
    # Bạn có thể thêm trường password ở đây nếu cần thiết
    pass

class UserUpdate(BaseModel):
    # Tất cả Optional -> dùng cho PATCH (partial)
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    role: Optional[str] = "student"
    
class User(UserBase):
    """Schema dùng để trả về dữ liệu User (Response Model)"""
    id: int
    is_active: Optional[bool] = True
    
    
    # Quan hệ: Đảm bảo các thuộc tính này là List các Schema của Course
    # Nếu bạn định nghĩa các quan hệ này trong models.py
    courses: List["Course"] = []

    class Config:
        """Cấu hình để Pydantic có thể đọc dữ liệu từ một Object ORM"""
        from_attributes = True # Thay thế cho orm_mode = True trong Pydantic v2

# 2. Schemas cho Course
# ----------------------

class CourseBase(BaseModel):
    """Schema cơ bản dùng cho tạo và cập nhật Course"""
    title: str
    description: Optional[str] = None # Dùng Optional nếu trường này có thể null/None

class CourseCreate(CourseBase):
    """Schema dùng khi tạo Course mới"""
    pass

class Course(CourseBase):
    """Schema dùng để trả về dữ liệu Course (Response Model)"""
    id: int
    owner_id: int
    
    # Quan hệ: Thông tin người sở hữu (dùng User schema cơ bản)
    # Lưu ý: Tránh import vòng lặp (circular dependency) bằng cách dùng ForwardRef nếu cần
    # Tuy nhiên, trong FastAPI/Pydantic, bạn thường định nghĩa quan hệ hai chiều như thế này.
    
    class Config:
        from_attributes = True

# 3. Schemas cho Book
# --------------------

class BookBase(BaseModel):
    """Schema cơ bản dùng cho tạo và cập nhật Book"""
    title: str
    author: Optional[str] = None
    isbn: Optional[str] = None

class BookCreate(BookBase):
    """Schema dùng khi tạo Book mới"""
    pass

class Book(BookBase):
    """Schema dùng để trả về dữ liệu Book (Response Model)"""
    id: int
    
    class Config:
        from_attributes = True

# Xử lý Import Vòng Lặp (Circular Dependency)
# Đây là bước cần thiết vì User schema tham chiếu đến Course schema
# và có thể Course schema cũng cần tham chiếu đến User schema. PUT PATCH tsao k dùng 2 cái giống nhau vdu 2 put 2 patch
# Mx 1 tk dc qly bởi 1 method hoặc 1 url nx là k thể có 2 tk có cùng 1 method, url
User.model_rebuild()