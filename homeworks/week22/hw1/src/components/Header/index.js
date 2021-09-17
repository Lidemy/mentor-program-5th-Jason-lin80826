import React, { useContext, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import LoginForm from "../LoginForm";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";

import { Layout, Menu, Button, Modal } from "antd";

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const { Header } = Layout;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getSelectedKey = () => {
    const pathname = location.pathname;
    console.log(pathname)
    if (pathname.indexOf("/list") === 0) return "list";
    if (pathname.indexOf("/about") === 0) return "about";
    if (pathname.indexOf("/addPost") === 0) return "addPost";
    return "/";
  };
  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Header className="fixed w-100 z-5">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[getSelectedKey()]}>
        <Menu.Item key="/">
          <Link to="/">首頁</Link>
        </Menu.Item>
        <Menu.Item key="list">
          <Link to="/list">文章列表</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">關於我</Link>
        </Menu.Item>
        <Menu.Item key="addPost">
          <Link to="/addPost">新增文章</Link>
        </Menu.Item>
      </Menu>
      <div
        className="absolute white flex-l dn items-center"
        style={{
          right: "32px",
          top: 0,
          height: "64px",
          position: "absolute",
        }}
      >
        {!user && (
          <Button type="primary" onClick={showModal}>
            登入
          </Button>
        )}
        {!user && (
          <Button type="primary" style={{ marginLeft: "20px" }}>
            <Link to="/register">註冊</Link>
          </Button>
        )}
        {user && (
          <Button type="primary" onClick={handleLogout}>
            登出
          </Button>
        )}
      </div>
      <Modal
        title="帳號登入"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <LoginForm handleOk={handleOk} />
      </Modal>
    </Header>
  );
}
