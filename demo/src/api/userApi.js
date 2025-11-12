// src/api/userApi.js
import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '../constants/api.js';

const userApi = {
  // GET: Lấy tất cả users
  getAll: (params) => {
    // params có thể là { page: 1, limit: 10, search: 'abc' }
    const url = API_ENDPOINTS.USERS;
    return axiosClient.get(url, { params });
  },

  // GET: Lấy user theo ID
  getById: (id) => {
    const url = `${API_ENDPOINTS.USERS}/${id}`;
    return axiosClient.get(url);
  },

  // POST: Tạo user mới
  create: (data) => {
    const url = API_ENDPOINTS.USERS;
    return axiosClient.post(url, data);
  },

  // PUT/PATCH: Cập nhật user
  update: (id, data) => {
    const url = `${API_ENDPOINTS.USERS}/${id}`;
    return axiosClient.put(url, data); // Hoặc axiosClient.patch
  },

  // DELETE: Xóa user
  remove: (id) => {
    const url = `${API_ENDPOINTS.USERS}/${id}`;
    return axiosClient.delete(url);
  },
};

export default userApi;