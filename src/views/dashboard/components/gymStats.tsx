import { Col, Flex } from 'antd'
import { useContext } from 'react'
import LineChart from './lineChart'
import { DashboardContext } from '../../../context/DashboardContext'

const GymStats: React.FC = () => {
  const { getAttendanceStats, getGymRevenue, state } =
    useContext(DashboardContext)

  return (
    <>
      <Flex vertical={false}>
        <Col style={{ width: '50%' }}>
          {state.gymData && (
            <LineChart
              chartTitle="Attendance Statistics"
              seriesValues={state.attendanceStats}
              fetchChartData={getAttendanceStats}
              recordId={state.gymData.id}
            />
          )}
        </Col>
        <Col style={{ width: '50%' }}>
          {state.gymData && (
            <LineChart
              chartTitle="Revenue"
              seriesValues={state.revenueDetails}
              fetchChartData={getGymRevenue}
              recordId={state.gymData.id}
            />
          )}
        </Col>
      </Flex>
    </>
  )
}

export default GymStats
