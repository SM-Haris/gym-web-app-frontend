import { portalService } from "./service";

export interface AttendanceInterface {
    date: string;
    workout_hours?: string;
    gym_id: string
}

export interface FetchAttendaceHoursInterface {
  to_date: string;
  from_date?: string;
}

export const getAttendaceHoursApi = (member_id: string, params: FetchAttendaceHoursInterface) => {
  return portalService({
    url: `/attendance/${member_id}/from/${params.from_date}/to/${params.to_date}`,
    method: "get",
  });
};


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

