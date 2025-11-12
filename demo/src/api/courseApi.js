// src/api/courseApi.js
import axiosClient from './axiosClient';

const COURSE_URL = '/courses'; 

const courseApi = {
    // 1. Lấy tất cả Khóa học (READ ALL)
    getAll: () => {
        return axiosClient.get(COURSE_URL);
    },

    // 2. Lấy chi tiết Khóa học theo ID (READ ONE)
    getById: (id) => {
        return axiosClient.get(`${COURSE_URL}/${id}`);
    },

    // 3. Tạo Khóa học mới (CREATE) - Gọi đúng đường dẫn FastAPI yêu cầu
    create: (data) => {
        // Lấy owner_id từ data, nếu không có thì mặc định là 1 (Admin/người tạo)
        const ownerId = data.owner_id || 1; 
        
        // Gửi POST request đến /api/v1/users/{ownerId}/courses/
        // Bỏ owner_id khỏi data gửi đi nếu nó không phải là trường của Course
        const { owner_id, ...courseData } = data; 
        
        return axiosClient.post(`/users/${ownerId}${COURSE_URL}/`, courseData); 
    },

    // 4. Cập nhật Khóa học (UPDATE)
    update: (id, data) => {
        return axiosClient.put(`${COURSE_URL}/${id}`, data);
    },

    // 5. Xóa Khóa học (DELETE)
    delete: (id) => {
        return axiosClient.delete(`${COURSE_URL}/${id}`);
    },
};

export default courseApi;