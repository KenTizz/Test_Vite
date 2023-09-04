import React, { useState } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import CustomHeader from "../../components/admin/Header/Header";
import CustomSider from "../../components/admin/Sidebar/Sidebar";

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ display: "flex", minHeight: "100vh" }}>
      <CustomSider collapsed={collapsed} colorBgContainer={colorBgContainer} />
      <Layout
        style={{ margin: 0, padding: 0, marginLeft: collapsed ? 70 : 240 }}
      >
        <CustomHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
        />
        <Layout.Content
          className="site-layout"
          style={{
            // background: colorBgContainer,
            margin: "60px 5px 0px 5px",
          }}
        >
          <Outlet />
        </Layout.Content>
        <Layout.Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default App;
