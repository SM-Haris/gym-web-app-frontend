import { Button, Form, Input } from 'antd'
import { useContext, useMemo } from 'react'
import { DashboardContext } from '../../../context/DashboardContext'
import {
  MemberFormValues,
  MemberFormProps,
} from '../../../interfaces/dashboard'

const MemberForm: React.FC<MemberFormProps> = ({
  memberDefaultValues,
  renderType,
  setModalOpen,
}) => {
  const { state, createMember, updateMember } = useContext(DashboardContext)
  const [form] = Form.useForm<MemberFormValues>()

  const isEdit = useMemo(() => {
    return renderType === 'edit'
  }, [renderType])

  const handleFinish = async (data: MemberFormValues) => {
    let isCompleted = false

    if (isEdit && memberDefaultValues)
      isCompleted = await updateMember(memberDefaultValues.id, data)
    else isCompleted = await createMember(data)

    if (isCompleted) setModalOpen(false)
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(data) => handleFinish(data)}
      initialValues={memberDefaultValues}
    >
      <div
        style={{
          display: 'flex',
          flexDirection:'column',
          gap:20,
          width:'100%'
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter member's name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter member's email" },
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
            { required: true, message: "Please enter member's phone_number" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="fee"
          label="Fee"
          rules={[{ required: true, message: "Please enter member's fee" }]}
        >
          <Input type="number" prefix={'$'} />
        </Form.Item>
      </div>
      <div style={{display:'flex',justifyContent:'flex-end'}}>
      <Form.Item>
          <Button type="primary" htmlType="submit" loading={state.statsLoading}>
            {isEdit ? 'Update Member' : 'Create Member'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default MemberForm
