import { Avatar, Button, Col, Dropdown, Row } from 'antd'
import { useContext, useEffect } from 'react'
import type { MenuProps } from 'antd'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { getToken } from '../../api'

const Navbar: React.FC = () => {
  const { state, logout, getUser } = useContext(AuthContext)

  const items: MenuProps['items'] = [
    {
      label: 'Update your profile',
      key: '1',
    },
    {
      label: 'Logout',
      key: '2',
    },
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1':
        break
      case '2':
        logout()
    }
  }

  useEffect(()=>{
    if(getToken() && !state.user){
      getUser()
    }
  },[])

  return (
    <Row
      justify="space-between"
      align="middle"
      style={{
        padding: '10px 30px 10px 30px',
        borderRadius: 5,
      }}
    >
      <Link to="/">
        <h1 style={{ color: '#000000', padding: 0, margin: 0, fontSize: 48 }}>
          GymUp
        </h1>
      </Link>
      <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {state.user ? (
          <Dropdown menu={{ items, onClick }}>
            <Avatar>{state.user.name}</Avatar>
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button
              type="primary"
              style={{ borderRadius: '30px', padding: '0 30px 0 30px' }}
            >
              Login
            </Button>
          </Link>
        )}
      </Col>
    </Row>
  )
}

export default Navbar
