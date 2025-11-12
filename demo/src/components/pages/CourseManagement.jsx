// src/components/pages/CourseManagement.jsx
import React, { useState } from 'react';
import { Table, Button, Space, Typography, Modal, Form, Input, Select, message, Tag } from 'antd';
import { Plus, Edit, Trash2 } from 'lucide-react';

// Đảm bảo đường dẫn này là chính xác
import courseApi from '../../api/courseApi.js'; 
import useDataManagement from '../../hooks/useDataManagement.js'; 

const { Title } = Typography;

// Giả lập danh sách trạng thái khóa học
const statusOptions = [
    { value: 'active', label: 'Hoạt động', color: 'green' },
    { value: 'draft', label: 'Bản nháp', color: 'orange' },
    { value: 'archived', label: 'Đã lưu trữ', color: 'red' },
];

const CourseManagement = () => {
  // 1. Sử dụng custom hook để quản lý data, loading, và các hành động CRUD
  const { data: courses, loading, mutateData } = useDataManagement(courseApi);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null); 
  const [form] = Form.useForm();

  // 2. Xử lý Modal & Form
  const handleOpenModal = (course = null) => {
    setEditingCourse(course);
    if (course) {
      form.setFieldsValue({
        ...course,
        // Chuyển đổi owner_id thành chuỗi nếu cần thiết
        owner_id: course.owner_id ? String(course.owner_id) : undefined, 
      }); 
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const onFinish = async (values) => {
    const action = editingCourse ? 'update' : 'create';
    const courseId = editingCourse ? editingCourse.id : null; 
    
    try {
      await mutateData(action, courseId, values);
      message.success(`Khóa học đã được ${editingCourse ? 'cập nhật' : 'tạo mới'} thành công!`);
      setIsModalVisible(false);
    } catch (error) {
      message.error('Thao tác thất bại. Vui lòng kiểm tra kết nối API.');
      console.error(error);
    }
  };

  // 3. Xử lý xóa
  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa khóa học ID: ${id} này không?`,
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await mutateData('delete', id);
          message.success('Khóa học đã được xóa thành công!');
        } catch (error) {
          message.error('Xóa thất bại.');
        }
      },
    });
  };

  // 4. Cột hiển thị của Antd Table
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Tên Khóa Học', dataIndex: 'title', key: 'title', 
      render: (text) => <span className="font-medium text-indigo-600">{text}</span>
    },
    { title: 'Mô Tả', dataIndex: 'description', key: 'description', 
      render: (text) => <span className="text-gray-500 line-clamp-2">{text}</span>
    },
    { title: 'Người Tạo (ID)', dataIndex: 'owner_id', key: 'owner_id', width: 120 },
    { 
        title: 'Trạng Thái', 
        dataIndex: 'status', 
        key: 'status', 
        render: (status) => {
            const statusItem = statusOptions.find(item => item.value === status);
            return statusItem ? <Tag color={statusItem.color}>{statusItem.label.toUpperCase()}</Tag> : <Tag>N/A</Tag>;
        },
        width: 120
    },
    { 
      title: 'Hành Động', 
      key: 'action', 
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<Edit size={16} />} onClick={() => handleOpenModal(record)}>
            Sửa
          </Button>
          <Button danger icon={<Trash2 size={16} />} onClick={() => handleDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // 5. Render Giao diện
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <Title level={2} className="m-0">Quản Lý Khóa Học</Title>
        <Button 
          type="primary" 
          icon={<Plus size={18} />} 
          className="bg-indigo-600 hover:!bg-indigo-700" 
          onClick={() => handleOpenModal(null)}
        >
          Thêm Khóa Học
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={courses} 
        loading={loading} 
        rowKey="id" 
        pagination={{ pageSize: 10 }}
        className="shadow-lg bg-white rounded-lg"
      />

      {/* Modal Thêm/Sửa Khóa Học */}
      <Modal
        title={editingCourse ? 'Cập Nhật Khóa Học' : 'Thêm Khóa Học Mới'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null} 
      >
        <Form
          form={form}
          layout="vertical"
          name="course_form"
          onFinish={onFinish}
          initialValues={{ status: 'draft', owner_id: '1' }} // Giả định owner_id là 1
        >
          <Form.Item
            name="title"
            label="Tên Khóa Học"
            rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Mô Tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="owner_id"
            label="ID Người Tạo (Giả lập)"
            rules={[{ required: true, message: 'Vui lòng nhập ID người tạo!' }]}
          >
            <Input type="number" />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Trạng Thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select>
              {statusOptions.map(option => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-indigo-600 hover:!bg-indigo-700 mt-4">
              {editingCourse ? 'Cập Nhật' : 'Tạo Mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseManagement;