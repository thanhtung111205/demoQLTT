# models/book.py

from sqlalchemy import Column, Integer, String
from database import Base # Đảm bảo bạn có thể import Base ở đây

class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    author = Column(String(100))
    isbn = Column(String(20), unique=True)
    # ... (các cột khác)