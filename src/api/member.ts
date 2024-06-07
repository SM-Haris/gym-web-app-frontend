import { portalService } from "./service";

export const memberFetchApi = (gym_id: string) => {
  return portalService({
    url: `/member/${gym_id}`,
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