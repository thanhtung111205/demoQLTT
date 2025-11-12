// src/api/axiosClient.js
import axios from 'axios';
import { API_BASE_URL } from '../constants/api.js';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  // Thêm Token vào Header nếu có
  const token = localStorage.getItem('access_token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    // Trả về data (Giả định backend trả data trong response.data)
    return response.data;
  },
  (error) => {
    // Xử lý lỗi chung (ví dụ: lỗi 401)
    if (error.response && error.response.status === 401) {
      console.error("Lỗi 401: Unauthorized. Vui lòng đăng nhập lại.");
      // Có thể thêm logic redirect
    }
    return Promise.reject(error);
  }
);

export default axiosClient;