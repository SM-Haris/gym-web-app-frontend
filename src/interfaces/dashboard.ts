import { ReactElement } from 'react'
import { MemberDataInterface } from './member'

export interface SuccessDisplayInterface {
  sessionId: string
}

export interface SignUpFormValues {
  email: string
  password: string
  name: string
  phone_number: string
}

export interface GymCardProps {
  title: string
  description: string
  imageUrl: string
  flexDirection?: 'row' | 'row-reverse'
}

export interface DataType {
  id: string
  name: string
  email: string
  address: string
  is_present_today: boolean
  created_at: string
}

export interface MemberFormValues {
  name: string
  phone_number: string
  email: string
  fee: string
}

export interface MemberFormProps {
  memberDefaultValues?: MemberDataInterface
  renderType: 'edit' | 'create'
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface MarkAttendanceColumnProps {
  record: MemberDataInterface
  renderType: 'row' | 'column'
}

export interface LineChartProps {
  chartTitle: string
  seriesValues: { name: string; values: string[] }[]
  fetchChartData: any
  recordId?: string
}

export interface GymFormValues {
  name: string
  location: string
}

export interface EditMemberModalProps {
  editModalOpen: boolean
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  member?: MemberDataInterface
  title: string
  renderType: 'edit' | 'create'
}

export interface DeleteModalProps {
  deleteModalOpen: boolean
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  member: MemberDataInterface
}

export interface UpdateUserProps {
  setUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  updateModalOpen: boolean
}

export interface UserFormValues {
  name: string
  password: string
  phone_number: string
  confirm_password: string
}

export interface DeleteAccountProps {
  deleteModalOpen: boolean
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface Props {
  children?: ReactElement | null
}
