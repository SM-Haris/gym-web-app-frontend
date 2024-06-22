import React, { useContext } from 'react'
import { Form, Input, Button, Space } from 'antd'
import { Link } from 'react-router-dom' // Import Link for routing
import { AuthContext } from '../../context/AuthContext'
import { SignUpFormValues } from '../../interfaces/dashboard'
import './style.scss'

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
        height: 'fit-content',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      <div className="signup-div">
        <div className="signup-div-inner">
          <Form form={form} layout="vertical" onFinish={handleCheckout}>
            <h1>SignUp</h1>

            <Space direction="vertical" size={16}>
              <h2>Name</h2>

              <Form.Item
                name="name"
                rules={[
                  { required: true, message: 'Please enter your username!' },
                ]}
              >
                <Input />
              </Form.Item>
              <h2>Email</h2>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email address!',
                  },
                  {
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/im,
                    message: 'Please enter a valid email',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <h2>Phone Number</h2>
              <Form.Item
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your Phone Number!',
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
                  {
                    max: 15,
                    message: 'Password must not exceed 15 characters',
                  },
                  {
                    pattern: /^[a-zA-Z0-9]*$/,
                    message: 'Password must contain only alphabets & numbers',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Space>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={state.loading}
                  style={{ marginTop: 10 }}
                >
                  Checkout
                </Button>
              </Form.Item>
            </div>
            <Link to="/login" style={{ color: 'white' }}>
              Already have an account? Login
            </Link>
          </Form>
        </div>
      </div>
      <p className='sign-up-alert'
      >This is a test-mode stripe integration please use Card Number: '4242 4242 4242 4242' for a successful transaction</p>
    </div>
  )
}

export default SignupPage
