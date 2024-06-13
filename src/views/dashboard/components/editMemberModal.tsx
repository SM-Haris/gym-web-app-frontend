import { Modal } from 'antd'
import { DataType } from './membersTable'
import MemberForm from './memberForm'

export interface EditMemberModalProps {
  editModalOpen: boolean
  setEditModalOpen: any
  member?: DataType
  title: string
  renderType: 'edit' | 'create'
}

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
