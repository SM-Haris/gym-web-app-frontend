import React from 'react'
import { Button, Form, Layout } from 'antd'
import './style.scss'
import { Link } from 'react-router-dom'
import ContactComponent from '../../layout/components/contactComponent'
import {
  HourglassOutlined,
  MailOutlined,
  MobileOutlined,
  PushpinOutlined,
} from '@ant-design/icons'

const { Content } = Layout


const HomeContent: React.FC = () => {

  return (
    <Content className="content-page">
      <div className="hero">
        <div className="hero-title">
          <h3 style={{ color: '#FFFFFF', marginBottom: 0 }}>
            ONLINE GYM SUPERVISION
          </h3>
          <h2
            style={{
              color: '#F36100',
              fontSize: '64px',
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            MANAGE YOUR GYM
          </h2>
          <Link to="/signup">
            <Button
              type="primary"
              style={{
                borderRadius: '0px',
                background: '#F36100',
                padding: '30px 50px 30px 50px',
                fontSize: 24,
              }}
            >
              Join Us
            </Button>
          </Link>
        </div>
      </div>

      <div className='services-content'>
        <h2 style={{ color: '#F36100', width:'100%', textAlign:'center' }}>WHAT CAN WE DO?</h2>
        <h1 style={{width:'100%', textAlign:'center'}}>EASY GYM MANAGMENT</h1>
        <div className='service-card'>
              <HourglassOutlined className='service-icon'/>
              <h3>Time managment</h3>
              <p>Streamline your gym with our advanced tools. Track attendance, manage resources, and boost productivity. Maximize member satisfaction, every minute.</p>
        </div>
        <div className='service-card'>
              <HourglassOutlined className='service-icon'/>
              <h3>Time managment</h3>
              <p>Streamline your gym with our advanced tools. Track attendance, manage resources, and boost productivity. Maximize member satisfaction, every minute.</p>
        </div>
        <div className='service-card'>
              <HourglassOutlined className='service-icon'/>
              <h3>Time managment</h3>
              <p>Streamline your gym with our advanced tools. Track attendance, manage resources, and boost productivity. Maximize member satisfaction, every minute.</p>
        </div>
      </div>




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
          <Form>
            <Form.Item>
              <input placeholder="Name" className="email-form-input" />
            </Form.Item>
            <Form.Item>
              <input placeholder="Email" className="email-form-input" />
            </Form.Item>
            <Form.Item>
              <textarea
                placeholder="Comment"
                className="email-form-input-area"
              />
            </Form.Item>
            <Form.Item>
              <button className="email-form-button">SUBMIT</button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className='map-location'>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12087.069761554938!2d-74.2175599360452!3d40.767139456514954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c254b5958982c3%3A0xb6ab3931055a2612!2sEast%20Orange%2C%20NJ%2C%20USA!5e0!3m2!1sen!2sbd!4v1581710470843!5m2!1sen!2sbd"
        height="550"
        width={'80%'}
        title='random-location'
      ></iframe>

      </div>

      <div className="price-content">
        <h2 style={{ color: '#F36100' }}>OUR PRICE PLAN</h2>
        <div className="price-plan">
          <div className="price-plan-inner">
            <h1>Monthly Price Plan</h1>
            <h2
              style={{
                color: '#F36100',
                marginBottom: 10,
                fontSize: 64,
                marginTop: 15,
              }}
            >
              $ 5.00
            </h2>
            <h4 style={{ marginTop: 0 }}>/ per month</h4>
            <div>
              <h6 className="price-plan-items">Unlimited Members count</h6>
              <h6 className="price-plan-items">Attendance managment</h6>
              <h6 className="price-plan-items">Revenue Statistics</h6>
              <h6 className="price-plan-items">Month to Month</h6>
              <h6 className="price-plan-items">Any time cancellation</h6>
            </div>
            <button
              style={{
                marginTop: 30,
                width: '100%',
                height: 50,
                backgroundColor: '#232323',
                borderRadius: 0,
                border: 'none',
                color: '#FFFFFF',
                fontSize: 24,
              }}
            >
              {' '}
              ENROLL NOW
            </button>
          </div>
        </div>
      </div>
    </Content>
  )
}

export default HomeContent
