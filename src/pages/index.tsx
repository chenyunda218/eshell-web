import "../App.css";
import { Layout, Menu, Button } from "antd";
import type { MenuProps } from "antd";
import { Outlet, Navigate, Link } from "react-router-dom";

const { Header, Content, Sider } = Layout;

function Root() {
  return (
    // <div className="App">
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Navigate to="/dashboard" replace={true}></Navigate>
        <Link to="/dashboard">
          <Button style={{ margin: 5 }} type="primary">
            Dashboard
          </Button>
        </Link>
        <Link to="/query">
          <Button style={{ margin: 5 }} type="primary">
            Query
          </Button>
        </Link>
      </Header>
      <Content>
        <Outlet></Outlet>
      </Content>
    </Layout>
    // </div>
  );
}

export default Root;
