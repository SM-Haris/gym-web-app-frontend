import React, { useContext } from 'react'
import { Form, Input, Button, Typography, Space } from 'antd'
import { Link } from 'react-router-dom' // Import Link for routing
import { AuthContext } from '../../context/AuthContext'

interface SignUpFormValues {
  email: string
  password: string
  name: string
  phone_number: string
}

const SignupPage: React.FC = () => {
  const { checkout, state } = useContext(AuthContext)
  const [form] = Form.useForm<SignUpFormValues>()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={checkout}
      >
        <Typography.Title level={2}>SignUp</Typography.Title>

        <Space direction="vertical" size={16}>
          <Form.Item
            name="name"
            label="Username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email address!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter your Phone Number!' },
            ]}
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

        {/* <form action="/create-checkout-session" method="POST">
        <input type="hidden" name="lookup_key" value="GymUp_Subscription_-852faeb" /> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={state.loading}>
            Checkout
          </Button>
        </Form.Item>
        <Link to="/login">Already have an account? Login</Link>
      </Form>
    </div>
  )
}

export default SignupPage
