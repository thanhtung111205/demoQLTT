# models/__init__.py
# Chỉ cần import các lớp để chúng được đăng ký vào Base metadata
# Cú pháp import phải là: from .<tên_file> import <Tên_Class>

from .user import User
from .course import Course
from .book import Book 
# Đảm bảo class Book thực sự được định nghĩa trong models/book.py