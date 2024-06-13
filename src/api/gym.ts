import { FetchAttendaceHoursInterface } from "./member";
import { portalService } from "./service";

export const gymFetchApi = () => {
  return portalService({
    url: "/gym",
    method: "get",
  });
};

export const createGymApi = (params: any) => {
    return portalService({
      url: "/gym",
      method: "post",
      data: params
    });
  };

  export const gymRevenueApi = (gym_id: string, params: FetchAttendaceHoursInterface) => {
    return portalService({
      url: `/gym/revenue/${gym_id}/from/${params.from_date}/to/${params.to_date}`,
      method: "get",
    });
  };