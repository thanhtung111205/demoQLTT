import React, { useState } from 'react';
import {
  Table, Button, Space, Typography, Tag, Modal, Form, Input, Select, Switch, message
} from 'antd';
import { Plus, Edit, Trash2 } from 'lucide-react';

import userApi from '../../api/userApi.js'; 
import useDataManagement from '../../hooks/useDataManagement.js'; 

const { Title } = Typography;

const UserManagement = () => {
  // Dùng hook quản lý dữ liệu từ API
  const { data: users, loading, mutateData } = useDataManagement(userApi);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  // Mở form thêm / sửa
  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
      form.setFieldsValue({ role: 'student', is_active: true });
    }
    setIsModalVisible(true);
  };

  // Gửi form
  const onFinish = async (values) => {
    const action = editingUser ? 'update' : 'create';
    const userId = editingUser ? editingUser.id : null;

    try {
      await mutateData(action, userId, values);
      message.success(`Người dùng đã được ${editingUser ? 'cập nhật' : 'tạo mới'} thành công!`);
      setIsModalVisible(false);
    } catch (error) {
      message.error('Thao tác thất bại. Kiểm tra kết nối API!');
      console.error(error);
    }
  };

  // Xóa user
  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc chắn muốn xóa người dùng ID: ${id}?`,
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await mutateData('delete', id);
          message.success('Đã xóa người dùng!');
        } catch {
          message.error('Xóa thất bại.');
        }
      },
    });
  };

  // Cấu hình cột hiển thị
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 70 },
    { title: 'Họ Tên', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { 
      title: 'Vai Trò', 
      dataIndex: 'role', 
      key: 'role', 
      render: (role) => (
        <Tag color={
          role === 'admin' ? 'red' :
          role === 'teacher' ? 'blue' : 'green'
        }>
          {role ? role.toUpperCase() : 'STUDENT'}
        </Tag>
      ),
    },
    { 
      title: 'Trạng thái', 
      dataIndex: 'is_active', 
      key: 'is_active',
      render: (active) => (
        <Tag color={active ? 'green' : 'gray'}>
          {active ? 'Hoạt động' : 'Khóa'}
        </Tag>
      ),
    },
    { 
      title: 'Hành Động', 
      key: 'action', 
      render: (_, record) => (
        <Space>
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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Quản Lý Người Dùng</Title>
        <Button
          type="primary"
          icon={<Plus size={18} />}
          className="bg-indigo-600 hover:!bg-indigo-700"
          onClick={() => handleOpenModal(null)}
        >
          Thêm Người Dùng
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        className="shadow-lg bg-white rounded-lg"
      />

      {/* Modal thêm/sửa */}
      <Modal
        title={editingUser ? 'Cập Nhật Người Dùng' : 'Thêm Người Dùng'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="user_form"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Họ Tên"
            rules={[{ required: true, message: 'Nhập họ tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Email không hợp lệ!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="Vai Trò"
            rules={[{ required: true, message: 'Chọn vai trò!' }]}
          >
            <Select>
              <Select.Option value="admin">Quản Trị Viên</Select.Option>
              <Select.Option value="teacher">Giáo Viên</Select.Option>
              <Select.Option value="student">Học Viên</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="is_active"
            label="Trạng Thái"
            valuePropName="checked"
          >
            <Switch checkedChildren="Hoạt động" unCheckedChildren="Khóa" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-indigo-600 hover:!bg-indigo-700 mt-4"
            >
              {editingUser ? 'Cập Nhật' : 'Tạo Mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
