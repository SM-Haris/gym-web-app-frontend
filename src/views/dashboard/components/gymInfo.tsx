import { useContext, useState } from 'react'
import { DashboardContext } from '../../../context/DashboardContext'
import { Button, Form, Input } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { GymFormValues } from '../../../interfaces/dashboard'

const GymInformation: React.FC = () => {
  const { state, updateGym } = useContext(DashboardContext)
  const [form] = Form.useForm<GymFormValues>()
  const [editable, setEditable] = useState<boolean>(false)

  const onFinish = (data: GymFormValues) => {
    updateGym(data)
    setEditable(false)
  }

  return (
    <div className="gym-info">
      {state.gymData && (
        <Form
          onFinish={onFinish}
          form={form}
          initialValues={{
            name: state.gymData.name,
            location: state.gymData.location,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {!editable ? (
              <h1 style={{ margin: 0 }}>{state.gymData.name}</h1>
            ) : (
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter gym name' }]}
              >
                <Input />
              </Form.Item>
            )}
            <EditOutlined onClick={() => setEditable(true)} />
          </div>
          {!editable ? (
            <h2>{state.gymData ? state.gymData.location : null}</h2>
          ) : (
            <>
            <div style={{ display: 'flex'}}>
              <Form.Item
                name="location"
                label="Location"
                rules={[
                  { required: true, message: 'Please enter gym location' },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ display: 'flex', gap: 20, justifyContent:'flex-end' }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={() => setEditable(false)}>Cancel</Button>
          </div>
          </>
          )}
        </Form>
      )}
    </div>
  )
}

export default GymInformation
