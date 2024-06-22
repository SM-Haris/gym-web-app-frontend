import { Link } from 'react-router-dom'

const PricePlan: React.FC = () => {
  return (
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
          <Link to={'/signup'} style={{width:'100%'}}>
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
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PricePlan
