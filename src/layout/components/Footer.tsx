import React from 'react'
import { Row, Col, List } from 'antd'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <Row
      justify="center"
      style={{
        background:
          'linear-gradient(90deg, rgba(214,164,18,1) 49%, rgba(255,250,0,1) 100%)',
        padding: '2rem',
        color: '#fff',
      }}
    >
      <Col span={24}>
        <Row gutter={16}>
          <Col span={8}>
            <h3>GymUp</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              eget leo at tellus malesuada vehicula.
            </p>
          </Col>
          <Col span={8}>
            <h3>Links</h3>
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: 'Home', href: '/' },
                { title: 'About', href: '/about' },
                { title: 'Services', href: '/services' },
                { title: 'Contact', href: '/contact' },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Link to={item.href}>{item.title}</Link>}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col span={8}>
            <h3>Contact Us</h3>
            <p>
              123 Main Street, Anytown, USA
              <br />
              (555) 555-5555
              <br />
              info@gymupapp.com
            </p>
          </Col>
        </Row>
      </Col>
      <Col span={24} style={{ textAlign: 'center', marginTop: '1rem' }}>
        <p>&copy; {new Date().getFullYear()} GymUp. All Rights Reserved.</p>
      </Col>
    </Row>
  )
}

export default Footer
