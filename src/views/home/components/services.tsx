export interface ServicesProps {
  title: string
  description: string
  icon: any
}

const Services: React.FC<ServicesProps> = ({ title, description, icon }) => {
  return (
    <div className="service-card" key={title}>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default Services
