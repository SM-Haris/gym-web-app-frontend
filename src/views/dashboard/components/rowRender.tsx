import React, { useContext, useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { DatePicker, Flex } from 'antd'
import Typography from 'antd/es/typography/Typography'
import { RangePickerProps } from 'antd/es/date-picker'
import { Dayjs } from 'dayjs'
import {
  disabled7DaysDate,
  getDatesBetween,
  getDefaultDates,
} from '../../../utils'
import MarkAttendanceColumnRender, {
  MarkAttendanceColumnProps,
} from './markAttendanceForm'
import { DashboardContext } from '../../../context/DashboardContext'
import LineChart from './lineChart'
import { DataType } from './membersTable'

const { RangePicker } = DatePicker

const RowRender: React.FC<MarkAttendanceColumnProps> = ({
  record,
  renderType,
}) => {
  const { getAttendanceHours, state } = useContext(DashboardContext)

  const [chartsDateRange, setChartsDateRange] = useState<string[]>([])

  const setChartRange: RangePickerProps['onChange'] = (date, dateString) => {
    const dateBetween = getDatesBetween(dateString[0], dateString[1])
    setChartsDateRange(dateBetween)
    getAttendanceHours(record.id, {
      from_date: dateString[0],
      to_date: dateString[1],
    })
  }

  useEffect(() => {
    const defaultDates = getDefaultDates(true) as [string, string]
    setChartsDateRange(getDatesBetween(
      defaultDates[1],
      defaultDates[0]
    ))

    getAttendanceHours(record.id, {
      from_date: defaultDates[1],
      to_date: defaultDates[0],
    })
  }, [])

  return (
    <Flex vertical={true} gap={20}>
      {chartsDateRange && chartsDateRange.length > 0 ? (
        <LineChart
          chartTitle="Attendance"
          xAxisValues={chartsDateRange}
          seriesValues={[
            { name: 'Hours Logged', values: state.attendanceHours[record.id] },
          ]}
        />
      ) : null}
      <Flex vertical={false} gap={20} align="center">
        <Typography>Pick date range</Typography>
        <RangePicker
          disabledDate={disabled7DaysDate}
          onChange={setChartRange}
          defaultValue={getDefaultDates(false) as [Dayjs, Dayjs]}
        />
      </Flex>
      <Typography>Mark Attendance for a specific date:</Typography>
      <Flex gap={10} align="center">
        <MarkAttendanceColumnRender record={record} renderType={renderType} />
      </Flex>
    </Flex>
  )
}

export default RowRender
