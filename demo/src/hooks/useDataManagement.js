// src/hooks/useDataManagement.js
import { useState, useEffect, useCallback } from 'react';

// Hook chung để xử lý CRUD data
const useDataManagement = (api) => {
  // Trạng thái dữ liệu
  const [data, setData] = useState([]);
  // Trạng thái tải (Loading)
  const [loading, setLoading] = useState(false);
  // Trạng thái lỗi
  const [error, setError] = useState(null);

  /**
   * 1. Hàm GET: Lấy dữ liệu từ API
   * Được bọc trong useCallback để tránh re-render không cần thiết
   */
  const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      // Gọi hàm getAll từ đối tượng API (userApi, courseApi...) được truyền vào
      const response = await api.getAll(params); 
      
      // Giả định API trả về mảng dữ liệu trong trường 'data' hoặc trực tiếp là mảng
      setData(response.data || response); 
    } catch (err) {
      setError(err);
      console.error("Fetch Data Error:", err);
    } finally {
      setLoading(false);
    }
  }, [api]); // Dependency: Chỉ chạy lại khi 'api' thay đổi

  /**
   * 2. Hàm POST/PUT/DELETE: Thao tác thay đổi dữ liệu (Mutate)
   */
  const mutateData = useCallback(async (action, id, data) => {
    setLoading(true);
    setError(null);
    try {
      let result;
      // Dựa vào 'action' để gọi hàm tương ứng trong service API
      if (action === 'create') {
        result = await api.create(data);
      } else if (action === 'update') {
        result = await api.update(id, data);
      } else if (action === 'delete') {
        result = await api.remove(id);
      }
      
      // Sau khi thay đổi thành công, tự động load lại dữ liệu để cập nhật Table
      await fetchData(); 
      return result;

    } catch (err) {
      setError(err);
      console.error(`Mutate Data Error (${action}):`, err);
      // Ném lỗi để component Page xử lý hiển thị thông báo Antd (message.error)
      throw err; 
    } finally {
      setLoading(false);
    }
  }, [api, fetchData]); // Dependency: Cần fetchData để gọi lại

  /**
   * 3. Effect: Lấy dữ liệu lần đầu
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependency: fetchData (sẽ không chạy lại liên tục vì fetchData dùng useCallback)

  // Trả về các giá trị và hàm để component Page sử dụng
  return { data, loading, error, fetchData, mutateData };
};

export default useDataManagement;