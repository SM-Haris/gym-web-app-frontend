import { Button, Form, Input, Modal, Space } from 'antd'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { UpdateUserProps, UserFormValues } from '../../interfaces/dashboard'

const UpdateUserModal: React.FC<UpdateUserProps> = ({
  setUpdateModalOpen,
  updateModalOpen,
}) => {
  const { state, updateUser } = useContext(AuthContext)
  const [form] = Form.useForm<UserFormValues>()

  const handleUpdate = async (data: UserFormValues) => {
    const isUpdated = await updateUser(data)

    if (isUpdated) setUpdateModalOpen(false)
  }

  return (
    <Modal
      title="Update User Profile"
      open={updateModalOpen}
      footer={null}
      onCancel={() => setUpdateModalOpen(false)}
      okType="danger"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={state.user ? state.user : {}}
        onFinish={handleUpdate}
      >
        <Space direction="vertical" style={{width:'100%'}}>
          <Form.Item
            name="name"
            label="Name"
            style={{width:'100%'}}
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter your phone number' },
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
          <Form.Item
            name="confirm_password"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error('The new password that you entered do not match!')
                  )
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Space>
        <div style={{display:'flex', justifyContent:'flex-end', gap: 20}}>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={state.loading}>
            Update User
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => setUpdateModalOpen(false)}
            loading={state.loading}
          >
            Cancel
          </Button>
        </Form.Item>

        </div>
      </Form>
    </Modal>
  )
}

export default UpdateUserModal
