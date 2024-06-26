import React, { useContext } from 'react'
import { Flex } from 'antd'
import Typography from 'antd/es/typography/Typography'
import MarkAttendanceColumnRender from './markAttendanceForm'
import { DashboardContext } from '../../../context/DashboardContext'
import LineChart from './lineChart'
import { MarkAttendanceColumnProps } from '../../../interfaces/dashboard'

const RowRender: React.FC<MarkAttendanceColumnProps> = ({
  record,
  renderType,
}) => {
  const { getAttendanceHours, state } = useContext(DashboardContext)

  return (
    <div className="member-attendance-row">
      <LineChart
        chartTitle="Attendance"
        seriesValues={[
          { name: 'Hours Logged', values: state.attendanceHours[record.id] },
        ]}
        fetchChartData={getAttendanceHours}
        recordId={record.id}
        chartType="memberAttendance"
      />
      <div style={{display:'flex',justifyContent:'flex-start',width:'100%'}}>
        <Typography>Mark Attendance for a specific date:</Typography>
      </div>
      <Flex gap={10} align="center">
        <MarkAttendanceColumnRender record={record} renderType={renderType} />
      </Flex>
    </div>
  )
}

export default RowRender
