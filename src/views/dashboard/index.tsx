import { DashboardContextProvider } from '../../context/DashboardContext'
import DashboardContent from './content'
import './style.scss'

const Dashboard: React.FC = () => {
  return (
    <DashboardContextProvider>
      <DashboardContent />
    </DashboardContextProvider>
  )
}

export default Dashboard
