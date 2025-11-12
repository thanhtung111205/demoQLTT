// src/components/layout/MainLayout.jsx
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const { Content, Footer } = Layout;

const MainLayout = () => {
  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Nội dung trang */}
<Content className="p-0 bg-red-400"> 
  <Outlet /> 
</Content>

      {/* Footer */}
      <Footer className="text-center bg-white border-t border-gray-100 text-gray-500 text-sm">
        OCEAN Center ©{new Date().getFullYear()} - Chinh Phục Công Nghệ
      </Footer>
    </Layout>
  );
};

export default MainLayout;