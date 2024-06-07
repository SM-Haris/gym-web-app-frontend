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