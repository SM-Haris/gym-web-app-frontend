import { DownOutlined } from "@ant-design/icons";
import { Checkbox, Layout, Table, TableProps, Typography } from "antd"
import RowRender from "./components/expandedRowRender";

const {Content} = Layout
const {Title} = Typography

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Phone Number',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Mark Attendance',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }: any) => (
        <>
            <Checkbox>Present</Checkbox>
        </>
      ),
    },
    Table.EXPAND_COLUMN
  ];
  
  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  

const DashboardContent: React.FC = () => {
    return(
        <Content>
            <Title level={2}>Dashboard</Title>
            {/* <Flex style={{width: '100%', height:'100%', minHeight: '100vh', minWidth: '100vh'}} justify="center" align="center" vertical={true}>
                <Button>Add New Gym</Button>
                <Title level={5}>Seem like you haven't created a gym yet. Start one now!!</Title>
            </Flex> */}
            
            <Table columns={columns} dataSource={data}
            expandable={
                {
                    expandedRowRender: (record: DataType) => <RowRender/>
                }
            }
            />
        </Content>
    )
}

export default DashboardContent