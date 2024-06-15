import { FetchStatsInterface } from '../interfaces/attendance'
import { MemberInterface } from '../interfaces/member'
import { portalService } from './service'

export const memberFetchApi = (gym_id: string) => {
  return portalService({
    url: `/member/${gym_id}`,
    method: 'get',
  })
}

export const memberStatsApi = (gym_id: string, params: FetchStatsInterface) => {
  return portalService({
    url: `/member/stats/${gym_id}/from/${params.from_date}/to/${params.to_date}`,
    method: 'get',
  })
}

export const memberCreateApi = (gym_id: string, params: MemberInterface) => {
  return portalService({
    url: `/member/${gym_id}`,
    method: 'post',
    data: params,
  })
}

export const memberUpdateApi = (member_id: string, params: MemberInterface) => {
  return portalService({
    url: `/member/${member_id}`,
    method: 'patch',
    data: params,
  })
}

export const memberDeleteApi = (member_id: string) => {
  return portalService({
    url: `/member/${member_id}`,
    method: 'delete',
  })
}
