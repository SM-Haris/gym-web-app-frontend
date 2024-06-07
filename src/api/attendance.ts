import { portalService } from "./service";

export interface AttendanceInterface {
    date: string;
    workout_hours?: string;
}

export const markPresentApi = (member_id: string, params: AttendanceInterface) => {
  return portalService({
    url: `/attendance/mark_present/${member_id}`,
    method: "post",
    data: params 
  });
};

export const markAbsentApi = (member_id: string, params: AttendanceInterface) => {
    return portalService({
      url: `/attendance/mark_absent/${member_id}`,
      method: "post",
      data: params 
    });
  };

