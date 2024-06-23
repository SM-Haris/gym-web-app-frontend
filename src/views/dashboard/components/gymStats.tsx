import { useContext } from 'react'
import LineChart from './lineChart'
import { DashboardContext } from '../../../context/DashboardContext'

const GymStats: React.FC = () => {
  const { getAttendanceStats, getGymRevenue, state } =
    useContext(DashboardContext)

  return (
    <>
      <div className="gym-stats">
        <div className="gym-stats-chart">
          {state.gymData && (
            <LineChart
              chartTitle="Attendance Statistics"
              seriesValues={state.attendanceStats}
              fetchChartData={getAttendanceStats}
              recordId={state.gymData.id}
            />
          )}
        </div>
        <div className="gym-stats-chart">
          {state.gymData && (
            <LineChart
              chartTitle="Revenue"
              seriesValues={state.revenueDetails}
              fetchChartData={getGymRevenue}
              recordId={state.gymData.id}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default GymStats
