import "./book-list.css";

import { Pagination } from "antd";
import axios from "axios";
import React, { Component } from "react";

import BookItem from "../book-item/book-item";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.pageCahange = this.pageCahange.bind(this);
  }
  state = { books: [], categories: [], displayedBooks: [] };
  componentDidMount() {
    axios.get("/data/books.json").then(response => {
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
        }, []);
      const books = response.data.map((book, index) => ({
        ...book,
        id: index,
        rating: 0,
        onShelf: false
      }));
      const displayedBooks = [...response.data.filter((book, index) => index < 12 && index >= 0)];
      this.setState({
        books,
        categories,
        displayedBooks
      });
    });
  }

  pageCahange(page) {
    this.setState({
      displayedBooks: this.state.books.filter(book => {
        // console.log(book.id < page * 10 && book.id >= (page - 1) * 10);
        return book.id < page * 12 && book.id >= (page - 1) * 12;
      })
    });
  }

  render() {
    return (
      <div>
        <div className="Book-grid">
          {this.state.displayedBooks.map((book, index) => (
            <div className="Book-grid__item" key={index}>
              <BookItem book={book} />
            </div>
          ))}
        </div>

        <Pagination
          pageSize={12}
          defaultCurrent={1}
          total={this.state.books.length}
          onChange={this.pageCahange}
        />
      </div>
    );
  }
}

export default BookList;
