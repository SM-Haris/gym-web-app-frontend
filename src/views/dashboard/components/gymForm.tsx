import { Button, Flex, Form, Input, Space, Typography } from 'antd'
import { useContext } from 'react'
import { DashboardContext } from '../../../context/DashboardContext'
import { GymFormValues } from '../../../interfaces/dashboard'

const { Title } = Typography

const GymForm: React.FC = () => {
  const { state, createGym } = useContext(DashboardContext)
  const [form] = Form.useForm<GymFormValues>()

  return (
    <Flex
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        minWidth: '100vh',
      }}
      justify="center"
      align="center"
      vertical={true}
    >
      <Title level={5}>
        Seem like you haven't created a gym yet. Start one now!!
      </Title>
      <Form form={form} layout="vertical" onFinish={createGym}>
        <Space direction="vertical" style={{width:'100%'}}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter gym name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter gym location' }]}
          >
            <Input />
          </Form.Item>
        </Space>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={state.loading}>
            Add Gym
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default GymForm
