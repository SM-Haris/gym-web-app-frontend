import { Button, Col, Row } from "antd";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Row
      justify="space-between"
      align="middle"
      style={{
        background:
          "linear-gradient(90deg, rgba(214,164,18,1) 49%, rgba(255,250,0,1) 100%)",
        padding: 10,
        borderRadius: 5
      }}
    >
        <Link to="/">
          <h1 style={{ color: "#fff",padding:0, margin:0 }}>GymUp</h1>
        </Link>
      <Col span={8} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/login">
          <Button type="primary">Login</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default Navbar;
