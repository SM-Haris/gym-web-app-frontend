import React from 'react'
import { Layout, Row, Typography } from 'antd' // Import necessary components
import HomeImage from '../../images/sva-gym017.jpg'
import OfferImage1 from '../../images/Time_Management_04-01_generated.jpg'
import OfferImage2 from '../../images/System-Analysis.jpg'
import OfferImage3 from '../../images/634_generated.jpg'
import "./style.scss";


const { Content } = Layout // Destructure Content from Layout

interface GymCardProps {
  title: string
  description: string
  imageUrl: string
  flexDirection?:"row" | "row-reverse"
}

const GymCard: React.FC<GymCardProps> = ({
  title,
  description,
  imageUrl,
  flexDirection
}) => {
  return (
    <div key={title} className="card-column" style={{flexDirection:flexDirection}}>
      <div>
      <Typography.Title>{title}</Typography.Title>
      <Typography.Text>{description}</Typography.Text>
      </div>
      <div style={{display:'flex',alignItems:'center'}}>
        <img className='card-image' src={imageUrl} alt=""/>
      </div>
    </div>
  )
}

const HomeContent: React.FC = () => {
  // Dummy data for gym cards
  const gymCards: GymCardProps[] = [
    {
      title: 'Time managment',
      description:`Optimize your schedule with our advanced time management tools. Easily track members' attendance and workout hours, ensuring efficient use of gym time and resources. Stay on top of your gym's activities and maximize productivity with our intuitive interface, helping you make the most of every minute and enhance overall member satisfaction.`,
      imageUrl: OfferImage1,
    },
    {
      title: 'Comprehensive STEM Analysis',
      description:
        `Leverage our comprehensive STEM analysis tools to gain deep insights into your gym's performance. Track and analyze statistics for attendance, workout hours, and revenue, enabling data-driven decisions. Visualize trends, identify opportunities for improvement, and drive growth with our detailed analytical reports and user-friendly dashboards.`,
      imageUrl: OfferImage2,
      flexDirection: 'row-reverse'
    },
    {
      title: 'Revenue Insights',
      description:
        `Unlock the full potential of your gym's financial performance with our revenue insights tools. Monitor earnings, track growth trends, and analyze revenue streams effortlessly. Our detailed reports and intuitive dashboards help you make informed decisions to boost profitability and ensure sustainable business success.`,
      imageUrl:OfferImage3,
    },
  ]

  return (
    <Content className="content-page">
      <div className="home-card">
        <img className="home-card-image" src={HomeImage} alt=""/>
        <div className="home-card-title">GymUp</div>
      </div>
      <div style={{display:"flex",alignItems:'center', flexDirection:'column'}}>
        <Typography.Title level={1} style={{ marginTop: '6rem' }}>
          What We Offer?
        </Typography.Title>
        <Row gutter={16}>
          {gymCards.map((card) => (
            <GymCard {...card} />
          ))}
        </Row>
      </div>
    </Content>
  )
}

export default HomeContent
