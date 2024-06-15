export interface LoginFormValues {
  email: string
  password: string
}

export interface UserValidationValues {
  email: string
}

export interface UserUpdationInterface {
  phone_number: string
  name: string
  password: string
}

export interface SignUpDataInterface {
  name: string
  phone_number: string
  password: string
  email: string
}

export interface UserInterface {
  id: string
  name: string
  phone_number: string
  email: string
  created_at: string
  updated_at: string
  access_token: string
  refresh_token: string
}
