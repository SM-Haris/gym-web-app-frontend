import React, { useContext } from 'react'
import { Form, Input, Button, Space } from 'antd'
import { Link } from 'react-router-dom' // Import Link for routing
import { AuthContext } from '../../context/AuthContext'
import { LoginFormValues } from '../../interfaces/auth'
import './style.scss'

const LoginPage: React.FC = () => {
  const { login, state } = useContext(AuthContext)
  const [form] = Form.useForm<LoginFormValues>()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div className="login-div">
        <div className='login-div-inner'>
        <Form form={form} layout="vertical" onFinish={login}>
          <h1>Login</h1>
          <Space direction="vertical" size={16}>
            <h2>Email</h2>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email address!' },
                {
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/im,
                  message: 'Please enter a valid email',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <h2>Password</h2>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter your password!' },
                { min: 8, message: 'Password must be upto 8 characters' },
                { max: 15, message: 'Password must not exceed 15 characters' },
                {
                  pattern: /^[a-zA-Z0-9]*$/,
                  message: 'Password must contain only alphabets & numbers',
                },
              ]}
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
      </div>
    </div>
  )
}

export default LoginPage
