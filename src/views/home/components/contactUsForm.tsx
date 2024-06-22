import {
  MailOutlined,
  MobileOutlined,
  PushpinOutlined,
} from '@ant-design/icons'
import ContactComponent from '../../../layout/components/contactComponent'
import { Form } from 'antd'

export interface ContactFormValues {
  email: string
  from_name: string
  message: string
}

const ContactUsForm: React.FC = () => {
  const [form] = Form.useForm<ContactFormValues>()
  const onSubmit = (data: ContactFormValues) => {
    form.resetFields()
  }

  return (
    <div className="contact-us-content">
      <div className="contact-us-details">
        <h2>CONTACT US</h2>
        <h3>GET IN TOUCH</h3>
        <ContactComponent
          text="333 Middle Winchendon Rd, Rindge, NH 03461"
          icon={<PushpinOutlined className="contact-icon" />}
        />
        <ContactComponent
          text="+92 333 1900996"
          icon={<MobileOutlined className="contact-icon" />}
        />
        <ContactComponent
          text="dev.muhammad.haris@gmail.com"
          icon={<MailOutlined className="contact-icon" />}
        />
      </div>
      <div className="email-form">
        <Form form={form} onFinish={onSubmit}>
          <Form.Item name={'email'}>
            <input placeholder="Email" className="email-form-input" />
          </Form.Item>
          <Form.Item name={'from_name'}>
            <input placeholder="Name" className="email-form-input" />
          </Form.Item>
          <Form.Item name={'messsage'}>
            <textarea placeholder="Message" className="email-form-input-area" />
          </Form.Item>
          <Form.Item>
            <button className="email-form-button">SUBMIT</button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ContactUsForm
