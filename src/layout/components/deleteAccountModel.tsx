import { Modal } from 'antd'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { DeleteAccountProps } from '../../interfaces/dashboard'

const DeleteAccountModal: React.FC<DeleteAccountProps> = ({
  deleteModalOpen,
  setDeleteModalOpen,
}) => {
  const { deleteUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleDelete = async () => {
    const isDeleted = await deleteUser()
    if (isDeleted) setDeleteModalOpen(false)
    navigate('/home')
  }

  return (
    <>
      <Modal
        title="Delete User Account"
        open={deleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
        okType="danger"
      >
        <p>
          Are you sure you want to delete your account? This will completely
          delete all you account information and end your subscription
          immediately
        </p>
      </Modal>
    </>
  )
}

export default DeleteAccountModal
