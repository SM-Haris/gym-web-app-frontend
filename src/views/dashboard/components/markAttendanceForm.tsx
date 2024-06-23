import {
  Button,
  DatePicker,
  Input,
  InputNumberProps,
  Slider,
  Space,
} from 'antd'
import { useContext, useMemo, useState } from 'react'
import { convertDecimalToTime, convertTimeToDecimal } from '../../../utils'
import dayjs from 'dayjs'
import { DashboardContext } from '../../../context/DashboardContext'
import { MarkAttendanceColumnProps } from '../../../interfaces/dashboard'

const MarkAttendanceColumnRender: React.FC<MarkAttendanceColumnProps> = ({
  record,
  renderType,
}) => {
  const { markPresent, markAbsent } = useContext(DashboardContext)

  const isRow = useMemo(() => {
    return renderType === 'row'
  }, [renderType])

  const [pickerDate, setPickerDate] = useState(dayjs().format('YYYY-MM-DD'))

  const [time, setTime] = useState<{ hrs: number; mins: number }>({
    hrs: 0,
    mins: 30,
  })

  const onSliderChange: InputNumberProps['onChange'] = (value) => {
    setTime(convertDecimalToTime(value as number))
  }

  const onAbsentClick = () => {
    markAbsent(record.id, {
      date: pickerDate,
      workout_hours: convertTimeToDecimal(time),
    })
  }

  const onPresentClick = () => {
    markPresent(record.id, {
      date: pickerDate,
      workout_hours: convertTimeToDecimal(time),
    })
  }

  return (
    <>
      <div className='mark-attendance-div'>
        {isRow && (
          <DatePicker
            defaultValue={dayjs(pickerDate)}
            maxDate={dayjs()}
            allowClear={false}
            minDate={dayjs(record.created_at)}
            onChange={(date, dateString) => setPickerDate(dateString as string)}
          />
        )}
        <Slider
          min={0.5}
          max={8.0}
          step={0.01}
          style={{minWidth:'200px'}}
          defaultValue={0.5}
          styles={{
            rail: {
              backgroundColor: '#f36100'
            }
          }}
          onChange={onSliderChange}
          value={convertTimeToDecimal(time)}
        />
        <Space.Compact>
          <Input
            defaultValue={0}
            placeholder="hr"
            suffix="hr"
            style={{width:100}}
            value={time.hrs}
            onChange={(e) => setTime({ ...time, hrs: Number(e.target.value) })}
            min={0}
            max={8}
          />
          <Input
            defaultValue={30}
            placeholder="min"
            suffix="min"
            style={{width:100}}
            value={time.mins}
            onChange={(e) => setTime({ ...time, mins: Number(e.target.value) })}
            min={0}
            max={60}
          />
        </Space.Compact>
        <Button
          onClick={() => onPresentClick()}
          style={{
            background:
              record.is_present_today && !isRow ? '#99E099' : '#FFFFFF',
          }}
          disabled={record.is_present_today && !isRow}
        >
          {record.is_present_today && !isRow
            ? 'Already Present'
            : 'Mark Present'}
        </Button>
        {isRow && <Button onClick={() => onAbsentClick()}>Mark Absent</Button>}
      </div>
    </>
  )
}

export default MarkAttendanceColumnRender
