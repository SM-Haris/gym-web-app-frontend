import { Modal } from 'antd'
import MemberForm from './memberForm'
import { EditMemberModalProps } from '../../../interfaces/dashboard'

const EditMemberModal: React.FC<EditMemberModalProps> = ({
  editModalOpen,
  setEditModalOpen,
  member,
  title,
  renderType,
}) => {
  return (
    <Modal
      title={title}
      open={editModalOpen}
      onCancel={() => setEditModalOpen(false)}
      footer={null}
    >
      <MemberForm
        memberDefaultValues={member}
        renderType={renderType}
        setModalOpen={setEditModalOpen}
      />
    </Modal>
  )
}

export default EditMemberModal
