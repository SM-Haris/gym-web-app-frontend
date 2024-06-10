import { Layout, Typography } from "antd";
import MembersTable from "./components/membersTable";
import GymStats from "./components/gymStats";
import { useContext } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import { LoadingOutlined } from "@ant-design/icons";
import GymForm from "./components/gymForm";
import MemberForm from "./components/memberForm";

const { Content } = Layout;
const { Title } = Typography;

const DashboardContent: React.FC = () => {
  const { state } = useContext(DashboardContext);

  return (
    <Content style={{ padding: 20 }}>
      <Title level={2}>Dashboard</Title>
      {state.loading ? (
        <LoadingOutlined />
      ) : (
        <>
          {!state.loading &&
          state.gymData ? (
            <>
              <Title level={3}>Name: {state.gymData.name}</Title>
              <Title level={2}>Location: {state.gymData.location}</Title>            
              <Title level={3}>Gym Statistics</Title>
              <GymStats />
              {state.membersData && <MemberForm/>}
              <MembersTable />
            </>
          ) : (
            <GymForm/>
          )}
        </>
      )}
    </Content>
  );
};

export default DashboardContent;
