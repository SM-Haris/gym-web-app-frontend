import { Flex, Table, TableProps, Typography } from 'antd'
import RowRender from './rowRender'
import { useContext, useState } from 'react'
import { DashboardContext } from '../../../context/DashboardContext'
import MarkAttendanceColumnRender from './markAttendanceForm'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import DeleteMemberModal from './deleteMemeberModal'
import EditMemberModal from './editMemberModal'
import { MarkAttendanceColumnProps } from '../../../interfaces/dashboard'
import { MemberDataInterface } from '../../../interfaces/member'

const { Title } = Typography

const MarkAttendanceColumn: React.FC<MarkAttendanceColumnProps> = ({
  record,
  renderType,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
  return (
    <Flex gap={10}>
      <MarkAttendanceColumnRender record={record} renderType={renderType} />
      <DeleteOutlined onClick={() => setDeleteModalOpen(true)} />
      {deleteModalOpen && (
        <DeleteMemberModal
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          member={record}
        />
      )}
      {editModalOpen && (
        <EditMemberModal
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          member={record}
          title="Update Memeber"
          renderType="edit"
        />
      )}
      <EditOutlined
        onClick={() => {
          setEditModalOpen(true)
        }}
      />
    </Flex>
  )
}

const columns: TableProps<MemberDataInterface>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <p>{text}</p>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'Mark Attendance',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, record: MemberDataInterface) => (
      <MarkAttendanceColumn record={record} renderType="column" />
    ),
  },
  Table.EXPAND_COLUMN,
]

const MembersTable: React.FC = () => {
  const { state } = useContext(DashboardContext)

  return (
    <>
      <Title level={3}>Members Attendance Table</Title>
      <Table
        columns={columns}
        dataSource={state.membersData}
        rowKey={'id'}
        expandable={{
          expandedRowRender: (record: MemberDataInterface) => (
            <RowRender record={record} renderType="row" />
          ),
        }}
      />
    </>
  )
}

export default MembersTable
