import React, { useContext } from 'react'
import { Form, Input, Button, Typography, Space, Alert } from 'antd'
import { Link } from 'react-router-dom' // Import Link for routing
import { AuthContext } from '../../context/AuthContext'
import { SignUpFormValues } from '../../interfaces/dashboard'

const SignupPage: React.FC = () => {
  const { checkout, state, validateUser } = useContext(AuthContext)
  const [form] = Form.useForm<SignUpFormValues>()

  const handleCheckout = async (data: SignUpFormValues) => {
    let isValidated = await validateUser({ email: data.email })

    if (isValidated) checkout(data)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleCheckout}>
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
              {
                pattern:
                  /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/im,
                message: 'Please enter a valid email',
              },
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
            Checkout
          </Button>
        </Form.Item>
        <Link to="/login">Already have an account? Login</Link>
      </Form>
      <Alert
        message="This is a test-mode stripe integration please use Card Number: '4242 4242 4242 4242' for a successful transaction"
        type="success"
      />
    </div>
  )
}

export default SignupPage
