import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  MailOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const CustomSider: React.FC<{
  collapsed: boolean;
  colorBgContainer: string;
}> = ({ collapsed, colorBgContainer }) => {
  const items: MenuItem[] = [
    getItem("Trang chủ", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("Option 3", "3", <ContainerOutlined />),

    getItem("Quản lý sản phẩm", "sub1", <MailOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),

    getItem("Quản lý tài khoản", "sub2", <TeamOutlined />, [
      getItem(<Link to="/admin/khach-hang">Khách hàng</Link>, "9"),
      getItem(<Link to="/admin/nhan-vien">Nhân viên</Link>, "10"),
    ]),
  ];

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      style={{
        background: colorBgContainer,
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        zIndex: 2,
      }}
    >
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        style={{ background: colorBgContainer }}
      />
    </Layout.Sider>
  );
};

export default CustomSider;
