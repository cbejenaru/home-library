import "./App.css";

import { Icon, Layout, Menu } from "antd";
import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import BookList from "./components/book-list/book-list";
import ShelfList from "./components/shelf-list/shelf-list";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo">Digital Library</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="book" />
                <span className="nav-text">Book List</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/shelf-list">
                <Icon type="ordered-list" />
                <span className="nav-text">Shelfs</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/reviewed-shelfs">
                <Icon type="check-square" />
                <span className="nav-text">Reviewed Shelfs</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: "calc(100vh - 158.2px)" }}>
              <Route exact path="/" component={BookList} />
              <Route path="/shelf-list" component={ShelfList} />
              <Route path="/reviewed-shelfs" component={BookList} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
