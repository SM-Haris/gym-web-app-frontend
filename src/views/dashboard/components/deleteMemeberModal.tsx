import { Modal } from 'antd'
import { DataType } from './membersTable'
import { useContext } from 'react'
import { DashboardContext } from '../../../context/DashboardContext'

export interface DeleteModalProps {
  deleteModalOpen: boolean
  setDeleteModalOpen: any
  member: DataType
}

const DeleteMemberModal: React.FC<DeleteModalProps> = ({
  member,
  deleteModalOpen,
  setDeleteModalOpen,
}) => {
  const { deleteMember } = useContext(DashboardContext)

  const handleDelete = async() => {
    const isDeleted = await deleteMember(member.id)
    if (isDeleted)
      setDeleteModalOpen(false)
  }

  return (
    <>
      <Modal
        title="Delete Member"
        open={deleteModalOpen}
        onOk={handleDelete}
        onCancel={()=>setDeleteModalOpen(false)}
        okType='danger'
      >
        <p>
          Are you sure you want to delete memeber <q>{member.name}</q>
        </p>
      </Modal>
    </>
  )
}

export default DeleteMemberModal
