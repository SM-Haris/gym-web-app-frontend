import { Avatar, Button, Col, Dropdown, Row } from 'antd'
import { useContext, useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { getToken } from '../../api'
import { getAvatarName } from '../../utils'
import DeleteAccountModal from './deleteAccountModel'
import UpdateUserModal from './updateUserModal'

const Navbar: React.FC = () => {
  const { state, logout, getUser } = useContext(AuthContext)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)

  const items: MenuProps['items'] = [
    {
      label: 'Update your profile',
      key: '1',
    },
    {
      label: 'Delete Account',
      key: '2',
      danger: true,
    },
    {
      label: 'Logout',
      key: '3',
    },
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1':
        setUpdateModalOpen(true)
        break
      case '2':
        setDeleteModalOpen(true)
        break
      case '3':
        logout()
    }
  }

  useEffect(() => {
    if (
      getToken() &&
      !state.user &&
      window.location.href.includes('dashboard')
    ) {
      getUser()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Row
      justify="space-between"
      align="middle"
      style={{
        padding: '10px 30px 10px 30px',
        borderRadius: 5,
      }}
    >
      <Link to="/">
        <h1 style={{ color: '#000000', padding: 0, margin: 0, fontSize: 48 }}>
          GymUp
        </h1>
      </Link>
      <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {state.user ? (
          <>
            <Dropdown menu={{ items, onClick }}>
              <Avatar>{getAvatarName(state.user.name as string)}</Avatar>
            </Dropdown>
            {deleteModalOpen && (
              <DeleteAccountModal
                deleteModalOpen={deleteModalOpen}
                setDeleteModalOpen={setDeleteModalOpen}
              />
            )}
            {updateModalOpen && (
              <UpdateUserModal
                updateModalOpen={updateModalOpen}
                setUpdateModalOpen={setUpdateModalOpen}
              />
            )}
          </>
        ) : (
          <Link to="/login">
            <Button
              type="primary"
              style={{ borderRadius: '30px', padding: '0 30px 0 30px' }}
            >
              Login
            </Button>
          </Link>
        )}
      </Col>
    </Row>
  )
}

export default Navbar
