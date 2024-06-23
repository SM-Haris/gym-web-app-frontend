import React from 'react'
import { Button, Layout } from 'antd'
import './style.scss'
import { Link } from 'react-router-dom'
import {
  BarChartOutlined,
  HourglassOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons'
import Services from './components/services'
import PricePlan from './components/pricePlan'
import ContactUsForm from './components/contactUsForm'

const { Content } = Layout

const HomeContent: React.FC = () => {
  const appServices = [
    {
      title: `Time managment`,
      description: `Streamline your gym with our advanced tools. Track attendance,
            manage resources, and boost productivity. Maximize member
            satisfaction, every minute.`,
      icon: <HourglassOutlined className="service-icon" />,
    },
    {
      title: `STEM Analysis`,
      description: `Uncover hidden potential. Analyze attendance, workouts & revenue.
            Make data-driven decisions. Grow smarter, not harder.`,
      icon: <BarChartOutlined className="service-icon" />,
    },
    {
      title: `Revenue Insights`,
      description: `Maximize gym revenue. Track earnings, analyze trends, and boost
            profitability. Data-driven decisions for sustainable success.`,
      icon: <MoneyCollectOutlined className="service-icon" />,
    },
  ]

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

      <div className="services-content">
        <h2 style={{ color: '#F36100', width: '100%', textAlign: 'center' }}>
          WHAT CAN WE DO?
        </h2>
        <h1 style={{ width: '100%', textAlign: 'center' }}>
          EASY GYM MANAGMENT
        </h1>
        {appServices.map((service) => {
          return (
            <Services
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          )
        })}
      </div>

      <ContactUsForm/>

      <div className="map-location">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12087.069761554938!2d-74.2175599360452!3d40.767139456514954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c254b5958982c3%3A0xb6ab3931055a2612!2sEast%20Orange%2C%20NJ%2C%20USA!5e0!3m2!1sen!2sbd!4v1581710470843!5m2!1sen!2sbd"
          height="550"
          width={'80%'}
          title="random-location"
        ></iframe>
      </div>

        <PricePlan/>

    </Content>
  )
}

export default HomeContent
