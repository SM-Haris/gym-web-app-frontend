import { Button, Form, Input, Space, Typography, message } from "antd";
import { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";

const { Title } = Typography;

export interface MemberFormValues {
  name: string;
  phone_number: string;
  email: string;
}

const MemberForm: React.FC = () => {
  const { state, createMember } = useContext(DashboardContext);
  const [form] = Form.useForm<MemberFormValues>();

  const onFinishFailed = (errorInfo: any) => {
    message.error("Failed:", errorInfo);
  };

  return (
    <>
        <Title level={3}>Create Member</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={createMember}
        onFinishFailed={onFinishFailed}
      >
        <Space direction="horizontal" align="end">
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter member's name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter member's email" },
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={state.statsLoading}
              >
                Create Member
              </Button>
            </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default MemberForm;
