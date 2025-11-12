# main.py
from fastapi import FastAPI, Depends, HTTPException, status # Thêm status
from sqlalchemy.orm import Session
from typing import List # Thêm List cho response_model
import models, schemas, crud # Thêm crud
from database import engine, Base, get_db
from fastapi.middleware.cors import CORSMiddleware

# Khởi tạo App
app = FastAPI(title="FastAPI MySQL Demo")



# Cấu hình CORS
origins = [
    # Cho phép Front-end chạy trên localhost:5173 truy cập
    "http://localhost",
    "http://localhost:5173", 
    # Thêm các domain Front-end khác của bạn vào đây
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # Cho phép cookies/headers
    allow_methods=["*"],    # Cho phép tất cả các phương thức HTTP
    allow_headers=["*"],    # Cho phép tất cả các header
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "FastAPI connected successfully with MySQL"}

# --- ENDPOINTS CỦA USER ---

# Thêm người dùng
@app.post("/api/v1/users/", response_model=schemas.User, status_code=status.HTTP_201_CREATED) # Dùng status_code 201 cho CREATE
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Tạo người dùng mới.
    Kiểm tra email trùng lặp trước.
    """
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        # 400 Bad Request nếu email đã tồn tại
        raise HTTPException(status_code=400, detail="Email already registered") 
    
    return crud.create_user(db=db, user=user)

# Lấy danh sách tất cả người dùng
@app.get("/api/v1/users/", response_model=List[schemas.User]) # Dùng List[schemas.User]
def read_users(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    """
    Truy vấn toàn bộ danh sách users từ MySQL có phân trang (Pagination).
    """
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

# Lấy chi tiết 1 người dùng theo id
@app.get("/api/v1/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Cập nhật thông tin người dùng
@app.put("/api/v1/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, updated: schemas.UserCreate, db: Session = Depends(get_db)):
    user = crud.update_user(db, user_id=user_id, user_data=updated)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
@app.patch("/api/v1/users/{user_id}", response_model=schemas.User)
def patch_user(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    """
    Partial update: chỉ các field có trong request sẽ được cập nhật.
    Yêu cầu: schemas.UserUpdate phải được định nghĩa trong schemas.py (tất cả Optional).
    """
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Nếu dùng Pydantic v2 thì dùng model_dump; nếu v1 thì dict(exclude_unset=True)
    try:
        update_data = user.model_dump(exclude_unset=True)
    except AttributeError:
        update_data = user.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user
# Xóa người dùng
@app.delete("/api/v1/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT) # 204 No Content cho DELETE thành công
def delete_user(user_id: int, db: Session = Depends(get_db)):
    result = crud.delete_user(db, user_id=user_id)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    # Nếu thành công, không cần trả về gì, 204 No Content là chuẩn HTTP
    return



# --- ENDPOINTS CỦA COURSE ---
# Giả định: Tạm thời dùng owner_id cố định. Trong thực tế, owner_id lấy từ JWT/Token
@app.post("/api/v1/users/{user_id}/courses/", response_model=schemas.Course, status_code=status.HTTP_201_CREATED)
def create_course_for_user(user_id: int, course: schemas.CourseCreate, db: Session = Depends(get_db)):
    # 1. Kiểm tra người dùng tồn tại
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    # 2. Tạo khóa học
    return crud.create_course(db=db, course=course, owner_id=user_id)

# 2. Lấy danh sách Khóa học (READ ALL)
@app.get("/api/v1/courses/", response_model=List[schemas.Course])
def read_courses(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    courses = crud.get_courses(db, skip=skip, limit=limit)
    return courses

# 3. Lấy chi tiết Khóa học (READ ONE)
@app.get("/api/v1/courses/{course_id}", response_model=schemas.Course)
def read_course(course_id: int, db: Session = Depends(get_db)):
    course = crud.get_course(db, course_id=course_id)
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

# 4. Xóa Khóa học (DELETE)
@app.delete("/api/v1/courses/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_id: int, db: Session = Depends(get_db)):
    result = crud.delete_course(db, course_id=course_id)
    if not result:
        raise HTTPException(status_code=404, detail="Course not found")
    return