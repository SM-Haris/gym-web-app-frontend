import ReactECharts from 'echarts-for-react'
import { getLineChartOptions } from "../../../utils";

export interface LineChartProps {
  chartTitle: string
  xAxisValues: string[]
  seriesValues: { name: string; values: string[] }[]
}

const LineChart: React.FC<LineChartProps> = ({chartTitle,xAxisValues,seriesValues}) => {
  const options = getLineChartOptions(chartTitle,xAxisValues,seriesValues)

  return (
    <ReactECharts option={options} style={{ height: 400 }} />
  )
}

export default LineChart
