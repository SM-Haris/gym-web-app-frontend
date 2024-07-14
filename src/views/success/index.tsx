import { Row, Typography } from 'antd'
import { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const SuccessDisplay: React.FC = () => {
  const { signup } = useContext(AuthContext)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const userData = localStorage.getItem('sign_up_data')
    if (userData && searchParams.get('success')) {
      localStorage.removeItem('sign_up_data')
      setTimeout(() => {
        signup(JSON.parse(userData))
        navigate('/login')
      }, 3000)
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
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
        <Typography.Title level={1} style={{color:'#FFFFFF'}}>
          Thank you for suscribing to our services
        </Typography.Title>
      </Row>
      <Row>
        <Typography.Title level={4} style={{color:'#FFFFFF'}}>
          Please login into you account...
        </Typography.Title>
      </Row>
    </div>
  )
}

export default SuccessDisplay
