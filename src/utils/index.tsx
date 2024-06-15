import { DatePickerProps, message } from 'antd'
import dayjs from 'dayjs'

const disabled7DaysDate: DatePickerProps['disabledDate'] = (
  current,
  { from }
) => {
  if (from) {
    return Math.abs(current.diff(from, 'months')) >= 1
  }

  return false
}

const getDatesBetween = (startDate: string, endDate: string): string[] => {
  const dates: string[] = []
  const [startYear, startMonth, startDay] = startDate.split('-').map(Number)
  const [endYear, endMonth, endDay] = endDate.split('-').map(Number)

  let currentDate = new Date(startYear, startMonth - 1, startDay)

  while (currentDate <= new Date(endYear, endMonth - 1, endDay)) {
    const year = currentDate.getFullYear().toString().padStart(4, '0')
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')
    dates.push(`${year}-${month}-${day}`)
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

const getDefaultDates = (isDayJs: boolean) => {
  const today = dayjs()
  const sevenDaysAgo = dayjs().subtract(7, 'days')

  if (isDayJs) {
    return [today.format('YYYY-MM-DD'), sevenDaysAgo.format('YYYY-MM-DD')]
  }

  return [sevenDaysAgo, today]
}

const convertTimeToDecimal = (data: { hrs: number; mins: number }): number => {
  if (data.hrs < 0 || data.mins < 0 || data.mins >= 60) {
    message.error(
      'Invalid input. Hours must be non-negative, and minutes must be between 0 and 59.'
    )
  }

  const decimalHours = data.hrs + data.mins / 60
  return decimalHours
}

const convertDecimalToTime = (
  decimalTime: number
): { hrs: number; mins: number } => {
  if (decimalTime < 0) {
    throw new Error('Invalid input. Decimal time must be non-negative.')
  }

  let hrs = Math.floor(decimalTime)
  let mins = Math.round((decimalTime - hrs) * 60)

  if (mins >= 60) {
    hrs += Math.floor(mins / 60)
    mins %= 60
  } else if (mins < 0) {
    hrs -= Math.ceil(mins / 60)
    mins += 60
  }

  return { hrs, mins }
}

const getLineChartOptions = (
  chartTitle: string,
  xAxisValues: string[],
  seriesValues: { name: string; values: string[] }[]
) => {
  return {
    title: {
      text: chartTitle,
    },
    tooltip: {
      trigger: 'axis',
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: xAxisValues,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: seriesValues.map((series) => {
      return {
        name: series.name,
        type: 'line',
        areaStyle: {},
        data: series.values,
      }
    }),
  }
}

const getAvatarName = (name: string) => {
  if (!name) return '?'

  const splitString = name.split(' ')

  if (splitString.length > 1)
    return (
      splitString[0].charAt(0).toUpperCase() +
      splitString[1].charAt(0).toUpperCase()
    )

  return splitString[0].charAt(0).toUpperCase()
}

export {
  getDatesBetween,
  getDefaultDates,
  disabled7DaysDate,
  convertTimeToDecimal,
  convertDecimalToTime,
  getLineChartOptions,
  getAvatarName,
}
