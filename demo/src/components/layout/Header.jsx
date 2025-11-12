// src/components/layout/Header.jsx
import React from 'react';
import { Menu } from 'antd';
import { Home, Users, BookOpen, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { key: 'home', icon: <Home size={18} />, label: <Link to="/">Trang Chủ</Link> },
  { key: 'courses', icon: <BookOpen size={18} />, label: <Link to="/courses">Quản Lý Khóa Học</Link> },
  { key: 'users', icon: <Users size={18} />, label: <Link to="/users">Quản Lý Users</Link> },
  // Thêm mục khác
  { key: 'profile', icon: <User size={18} />, label: <Link to="/profile">Thông Tin Cá Nhân</Link> }, 
];

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white shadow-md z-10 sticky top-0">
      {/* Logo Section */}
      <div className="flex items-center text-xl font-bold text-indigo-700">
        <BookOpen className="mr-2 text-red-500" />
        OCEAN <span className="text-gray-500 ml-1 font-normal">Center</span>
      </div>

      {/* Navigation Menu */}
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['home']}
        items={navItems}
        className="flex-1 min-w-0 border-b-0 justify-end"
      />
    </header>
  );
};

export default Header;