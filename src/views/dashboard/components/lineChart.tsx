import ReactECharts from 'echarts-for-react'
import {
  disabled7DaysDate,
  getDatesBetween,
  getDefaultDates,
  getLineChartOptions,
} from '../../../utils'
import { DatePicker, Flex, Typography } from 'antd'
import { useContext, useEffect, useMemo, useState } from 'react'
import { RangePickerProps } from 'antd/es/date-picker'
import { Dayjs } from 'dayjs'
import { LineChartProps } from '../../../interfaces/dashboard'
import { DashboardContext } from '../../../context/DashboardContext'

const { RangePicker } = DatePicker

const LineChart: React.FC<LineChartProps> = ({
  chartTitle,
  seriesValues,
  fetchChartData,
  recordId,
  chartType
}) => {
  const { state } = useContext(DashboardContext)
  const [chartsDateRange, setChartsDateRange] = useState<string[]>([])

  const setChartRange: RangePickerProps['onChange'] = (date, dateString) => {
    const dateBetween = getDatesBetween(dateString[0], dateString[1])
    setChartsDateRange(dateBetween)
    fetchChartData(recordId, {
      from_date: dateString[0],
      to_date: dateString[1],
    })
  }

  useEffect(() => {
    const defaultDates = getDefaultDates(true) as [string, string]
    setChartsDateRange(getDatesBetween(defaultDates[1], defaultDates[0]))

    if ((state.revenueDetails.length === 0 && state.attendanceStats.length === 0) || chartType === 'memberAttendance')
      fetchChartData(recordId, {
        from_date: defaultDates[1],
        to_date: defaultDates[0],
      })
    // eslint-disable-next-line
  }, [])

  const options = useMemo(() => {
    return getLineChartOptions(chartTitle, chartsDateRange, seriesValues)
    // eslint-disable-next-line
  }, [seriesValues])

  return (
    <>
      <ReactECharts option={options} style={{ height: 400, width:'100%' }} />
      <Flex vertical={false} gap={20} align="center">
        <Typography>Pick date range</Typography>
        <RangePicker
          disabledDate={disabled7DaysDate}
          onChange={setChartRange}
          defaultValue={getDefaultDates(false) as [Dayjs, Dayjs]}
        />
      </Flex>
    </>
  )
}

export default LineChart
