import { DashboardContextProvider } from "../../context/DashboardContext";
import DashboardContent from "./content";

const Dashboard: React.FC = () => {
  return (
    <DashboardContextProvider>
      <DashboardContent />
    </DashboardContextProvider>
  );
};

export default Dashboard;
