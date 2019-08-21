import "./App.css";

import { Icon, Layout, Menu } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import BookList from "./components/book-list/book-list";
import ShelfList from "./components/shelf-list/shelf-list";
import ReviewsPage from "./components/reviews-page/reviews-page";
import ComentContext from "./ComentContext";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const shelvesInit = () => {
    const localShelves = localStorage.getItem("shelves");
    return localShelves ? JSON.parse(localShelves) : [];
  };
  const comentsInit = () => {
    const localComents = localStorage.getItem("coments");
    return localComents
      ? JSON.parse(localComents).map(coment => ({
          ...coment,
          createdAt: new Date(coment.createdAt)
        }))
      : [];
  };
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shelves, setShelves] = useState(shelvesInit());
  const [coments, setComents] = useState(comentsInit());

  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
    localStorage.setItem("shelves", JSON.stringify(shelves));
    localStorage.setItem("coments", JSON.stringify(coments));
  }, [shelves, books, coments]);

  const getBooks = async () => {
    const response = await axios.get("/data/books.json");
    const categories = response.data
      .map(book => book.categories)
      .reduce((acc, el) => {
        const bookCategories = [];
        el.forEach(category => {
          if (acc.indexOf(category) < 0) {
            bookCategories.push(category);
          }
        });
        return [...acc, ...bookCategories];
      }, [])
      .map((category, index) => ({ name: category, id: index }));
    const books = response.data.map((book, index) => ({
      ...book,
      id: index,
      rating: 0,
      shelfId: null,
      categories: book.categories.map(category => categories.find(c => c.name === category).id)
    }));
    setCategories(categories);
    setBooks(books);
  };

  const updateBooks = book => {
    const index = books.findIndex(item => item.id === book.id);
    books[index] = { ...book };
  };

  return (
    <Router>
      <Layout>
        <Sider breakpoint="lg" collapsedWidth="0">
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
              <Link to="/reviews">
                <Icon type="check-square" />
                <span className="nav-text">Reviews</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <ComentContext.Provider value={{ coments, setComents }}>
            <Content style={{ margin: "24px 16px 0" }}>
              <div style={{ padding: 24, background: "#fff", minHeight: "calc(100vh - 158.2px)" }}>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <BookList
                      shelves={shelves}
                      books={books}
                      categories={categories}
                      updateBooks={updateBooks}
                    />
                  )}
                />
                <Route
                  path="/shelf-list"
                  render={() => (
                    <ShelfList
                      shelves={shelves}
                      books={books}
                      updateShelves={list => {
                        setShelves([...list]);
                      }}
                      categories={categories}
                    />
                  )}
                />
                <Route
                  path="/reviews"
                  render={() => <ReviewsPage books={books} shelves={shelves} />}
                />
              </div>
            </Content>
          </ComentContext.Provider>
          <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
