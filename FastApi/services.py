# app/services.py (Hoặc services.py nếu ở thư mục gốc)

from sqlalchemy.orm import Session
from . import crud, schemas # Import các module ngang hàng
from fastapi import HTTPException, status
from typing import List


def get_user_by_id_or_404(db: Session, user_id: int):
    """Lấy user theo ID hoặc raise 404 nếu không tìm thấy."""
    user = crud.get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"User with ID {user_id} not found."
        )
    return user

def get_all_active_users(db: Session, skip: int = 0, limit: int = 100) -> List[schemas.User]:
    """Lấy danh sách tất cả người dùng (áp dụng logic nghiệp vụ: chỉ lấy active)."""
    # ⚠️ Logic Nghiệp vụ: Giả sử crud có hàm lọc trạng thái
    return crud.get_active_users(db, skip=skip, limit=limit) 


def create_new_course_with_fees(db: Session, course: schemas.CourseCreate, creator_id: int):
    """
    Logic nghiệp vụ cho việc tạo khóa học.
    - Điều chỉnh giá trị khóa học (ví dụ: thêm phí nền tảng 5%).
    - Đảm bảo người tạo là một user hợp lệ.
    """
    # 1. Kiểm tra User tồn tại (Điều phối nhiều CRUD)
    creator = get_user_by_id_or_404(db, creator_id)
    
    # 2. Xử lý Logic Nghiệp vụ: Tăng giá 5% cho phí nền tảng
    if course.price:
        course.price = course.price * 1.05
    
    # 3. Điều phối (Gọi CRUD để lưu)
    return crud.create_user_course(db=db, course=course, user_id=creator.id)

def get_courses_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    """Lấy tất cả các khóa học được tạo bởi một user cụ thể."""
    # Logic: Đảm bảo user tồn tại trước khi lấy khóa học
    get_user_by_id_or_404(db, user_id)
    return crud.get_courses_by_user_id(db, user_id=user_id, skip=skip, limit=limit)