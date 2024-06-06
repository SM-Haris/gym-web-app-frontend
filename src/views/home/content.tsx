import React from 'react';
import { Layout, Card, Row, Col, Image, Typography, Button } from 'antd'; // Import necessary components

const { Content } = Layout; // Destructure Content from Layout

interface GymCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkText?: string; // Optional link text
  linkUrl?: string; // Optional link URL
}

const GymCard: React.FC<GymCardProps> = ({ title, description, imageUrl, linkText, linkUrl }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<Image alt={title} src={imageUrl} preview={false} />}
    >
      <Card.Meta title={title} description={description} />
      {linkText && linkUrl && (
        <Button type="primary" size="small" href={linkUrl}>
          {linkText}
        </Button>
      )}
    </Card>
  );
};

const HomeContent: React.FC = () => {
  // Dummy data for gym cards
  const gymCards: GymCardProps[] = [
    {
      title: 'Strength Training',
      description: 'Build muscle and increase strength with our personalized programs.',
      imageUrl: 'https://picsum.photos/id/200/300/sports',
      linkText: 'Learn More',
      linkUrl: '/strength-training', // Replace with actual URL
    },
    {
      title: 'Cardio Fitness',
      description: 'Get your heart pumping with our high-energy cardio classes.',
      imageUrl: 'https://picsum.photos/id/201/300/gym',
      linkText: 'Explore Classes',
      linkUrl: '/cardio-classes', // Replace with actual URL
    },
    {
      title: 'Group Fitness',
      description: 'Train together and motivate each other with our fun group workouts.',
      imageUrl: 'https://picsum.photos/id/202/300/sports',
      linkText: 'Join a Class',
      linkUrl: '/group-fitness', // Replace with actual URL
    },
  ];

  return (
    <Content style={{ padding: '0 50px' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Typography.Title level={2}>Welcome to GymUp!</Typography.Title>
          <Typography.Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget leo at tellus malesuada vehicula.
          </Typography.Paragraph>
          <Button type="primary" size="large" href="/about">
            Learn More About Us
          </Button>
        </Col>
        <Col span={24}>
          <Typography.Title level={3} style={{ marginTop: '2rem' }}>
            What We Offer
          </Typography.Title>
          <Row gutter={16}>
            {gymCards.map((card) => (
              <Col key={card.title} xs={24} sm={12} md={8} lg={6}>
                <GymCard {...card} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Content>
  );
};

export default HomeContent;
