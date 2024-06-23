import { Row, Typography } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CancelPage: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/login')
    }, 3000)
  }, [])

  return (
    <div
      style={{
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Row>
        <Typography.Title level={1} style={{ color: '#FFFFFF' }}>
          Sorry but your transaction was unsuccessful
        </Typography.Title>
      </Row>
      <Row>
        <Typography.Title level={4} style={{ color: '#FFFFFF' }}>
          Please sign up again...
        </Typography.Title>
      </Row>
    </div>
  )
}

export default CancelPage
