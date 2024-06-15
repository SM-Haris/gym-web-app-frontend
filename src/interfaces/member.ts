export interface MemberInterface {
  name: string
  phone_number: string
  fee: string
  email: string
}

export interface MemberDataInterface extends MemberInterface {
  id: string
  created_at?: string
  updated_at?: string
  is_present_today?: boolean
}
