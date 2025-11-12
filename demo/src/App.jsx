// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Homepage from './components/pages/Homepage';
import UserManagement from './components/pages/UserManagement';
import CourseManagement from './components/pages/CourseManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout áp dụng cho tất cả các trang */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          
          {/* Bạn có thể thêm các route khác tại đây */}
          {/* <Route path="bookings" element={<BookingManagement />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;