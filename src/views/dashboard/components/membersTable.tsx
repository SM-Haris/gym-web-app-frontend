import {
  Table,
  TableProps,
  Typography,
} from "antd";
import RowRender from "./rowRender";
import { useContext, useEffect } from "react";
import { DashboardContext } from "../../../context/DashboardContext";
import MarkAttendanceColumnRender from "./markAttendanceForm";

const { Title } = Typography;

export interface DataType {
  id: string;
  name: string;
  email: string;
  address: string;
  is_present_today: boolean;
  created_at: string;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <p>{text}</p>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "Mark Attendance",
    key: "tags",
    dataIndex: "tags",
    render: (_, record: DataType) => (
      <MarkAttendanceColumnRender record={record} renderType={"column"} />
    ),
  },
  Table.EXPAND_COLUMN,
];

const MembersTable: React.FC = () => {
  const { state } = useContext(DashboardContext);

  return (
    <>
      <Title level={3}>Members Attendance Table</Title>
      <Table
        columns={columns}
        dataSource={state.membersData}
        rowKey={"id"}
        expandable={{
          expandedRowRender: (record: DataType) => (
            <RowRender record={record} renderType="row" />
          ),
        }}
      />
    </>
  );
};

export default MembersTable;
