import { Row, Typography } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export interface SuccessDisplayInterface {
  sessionId: string
}

const SuccessDisplay: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/login')
    }, 3000)
    // eslint-disable-next-line
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Row>
        <Typography.Title level={1}>
          Thank you for suscribing to our services
        </Typography.Title>
      </Row>
      <Row>
        <Typography.Title level={4}>
          Please login into you account...
        </Typography.Title>
      </Row>
    </div>
  )
}

export default SuccessDisplay
