import { portalService } from "./service";

export interface FetchAttendaceHoursInterface {
  to_date: string;
  from_date?: string;
}

export const memberFetchApi = (gym_id: string) => {
  return portalService({
    url: `/member/${gym_id}`,
    method: "get",
  });
};

export const memberStatsApi = (gym_id: string, params: FetchAttendaceHoursInterface) => {
  return portalService({
    url: `/member/stats/${gym_id}/from/${params.from_date}/to/${params.to_date}`,
    method: "get",
  });
};

export const memberCreateApi = (gym_id: string, params: any) => {
  return portalService({
    url: `/member/${gym_id}`,
    method: "post",
    data: params
  });
};