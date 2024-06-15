export interface GymInterface {
  name: string
  location: string
}

export interface GymDataInterface extends GymInterface {
  created_at: string
  updated_at: string
  owner_id: string
  id: string
}
