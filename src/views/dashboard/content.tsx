import { Button, Flex, Layout, Typography } from 'antd'
import MembersTable from './components/membersTable'
import GymStats from './components/gymStats'
import { useContext, useState } from 'react'
import { DashboardContext } from '../../context/DashboardContext'
import { LoadingOutlined } from '@ant-design/icons'
import GymForm from './components/gymForm'
import EditMemberModal from './components/editMemberModal'

const { Content } = Layout
const { Title } = Typography

const DashboardContent: React.FC = () => {
  const { state } = useContext(DashboardContext)
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false)

  return (
    <Content style={{ padding: 20 }}>
      <Title level={2}>Dashboard</Title>
      {state.loading ? (
        <LoadingOutlined />
      ) : (
        <>
          {!state.loading && state.gymData ? (
            <>
              <Title level={3}>Name: {state.gymData.name}</Title>
              <Title level={2}>Location: {state.gymData.location}</Title>
              <Title level={3}>Gym Statistics</Title>
              <GymStats />
              <Flex
                style={{
                  alignItems: 'center',
                  width: '100%',
                  margin: '50px 0 30px 0',
                  justifyContent: 'center',
                }}
              >
                <Button type="primary" onClick={() => setEditModalOpen(true)}>
                  + Add New Memeber
                </Button>
              </Flex>
              {editModalOpen && (
                <EditMemberModal
                  editModalOpen={editModalOpen}
                  setEditModalOpen={setEditModalOpen}
                  title="Create Member"
                  renderType='create'
                />
              )}

              <MembersTable />
            </>
          ) : (
            <GymForm />
          )}
        </>
      )}
    </Content>
  )
}

export default DashboardContent
