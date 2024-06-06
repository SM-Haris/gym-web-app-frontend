import React, { useContext } from 'react';
import { Form, Input, Button, Typography, Space } from 'antd';
import { Link } from 'react-router-dom'; // Import Link for routing
import { AuthContext } from '../../context/AuthContext';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
const {login, state } = useContext(AuthContext)
  const [form] = Form.useForm<LoginFormValues>();

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form form={form} layout="vertical" onFinish={login} onFinishFailed={onFinishFailed}>
        <Typography.Title level={2}>Login</Typography.Title>

        <Space direction="vertical" size={16}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter your email address!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Space>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={state.loading}>
            Login
          </Button>
        </Form.Item>
        <Link to="/signup">Don't have an account? SignUp</Link> 
      </Form>
    </div>
  );
};

export default LoginPage;
