# crud.py
from sqlalchemy.orm import Session
import models, schemas

# Lấy User theo ID
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

# Lấy User theo Email (Dùng cho kiểm tra trùng lặp)
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

# Lấy danh sách User có phân trang
def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

# Tạo User
def create_user(db: Session, user: schemas.UserCreate):
    # Truyền đầy đủ các trường, có thể dùng model_dump() của Pydantic
    db_user = models.User(
        name=user.name,
        email=user.email,
        role=user.role or "student",  # ✅ thêm role (mặc định 'student' nếu null)
        is_active=True                # tùy bạn muốn mặc định thế nào
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Cập nhật User
def update_user(db: Session, user_id: int, user_data: schemas.UserUpdate):
    db_user = get_user(db, user_id)
    if db_user:
        for key, value in user_data.model_dump(exclude_unset=True).items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
        return db_user
    return None


# Xóa User
def delete_user(db: Session, user_id: int):
    db_user = get_user(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False # Không tìm thấy để xóa

def create_course(db: Session, course: schemas.CourseCreate, owner_id: int):
    db_course = models.Course(**course.dict(), owner_id=owner_id)
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

# Lấy danh sách courses (có phân trang)
def get_courses(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Course).offset(skip).limit(limit).all()