import {
  AttendanceInterface,
  FetchStatsInterface,
} from '../interfaces/attendance'
import { portalService } from './service'

export const getAttendaceHoursApi = (
  member_id: string,
  params: FetchStatsInterface
) => {
  return portalService({
    url: `/attendance/${member_id}/from/${params.from_date}/to/${params.to_date}`,
    method: 'get',
  })
}

export const markPresentApi = (
  member_id: string,
  params: AttendanceInterface
) => {
  return portalService({
    url: `/attendance/mark_present/${member_id}`,
    method: 'post',
    data: params,
  })
}

export const markAbsentApi = (
  member_id: string,
  params: AttendanceInterface
) => {
  return portalService({
    url: `/attendance/mark_absent/${member_id}`,
    method: 'post',
    data: params,
  })
}
