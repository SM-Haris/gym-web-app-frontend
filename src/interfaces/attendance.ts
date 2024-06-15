export interface AttendanceInterface {
  date: string
  workout_hours?: number
  gym_id?: string
}

export interface FetchStatsInterface {
  to_date: string
  from_date: string
}
