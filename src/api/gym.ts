import { FetchStatsInterface } from '../interfaces/attendance'
import { GymInterface } from '../interfaces/gym'
import { portalService } from './service'

export const gymFetchApi = () => {
  return portalService({
    url: '/gym',
    method: 'get',
  })
}

export const createGymApi = (params: GymInterface) => {
  return portalService({
    url: '/gym',
    method: 'post',
    data: params,
  })
}

export const updateGymApi = (gym_id: string, params: GymInterface) => {
  return portalService({
    url: `/gym/${gym_id}`,
    method: 'patch',
    data: params,
  })
}

export const gymRevenueApi = (gym_id: string, params: FetchStatsInterface) => {
  return portalService({
    url: `/gym/revenue/${gym_id}/from/${params.from_date}/to/${params.to_date}`,
    method: 'get',
  })
}
