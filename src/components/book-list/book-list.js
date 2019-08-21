import "./book-list.css";

import { Pagination, Modal } from "antd";
import React, { useEffect, useState } from "react";

import BookItem from "../book-item/book-item";
import BookModal from "../book-modal/book-modal";

const BookList = ({ categories, shelves, books, updateBooks }) => {
  const [visible, setVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState();
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    changePage();
  }, [books, page]);

  const changePage = () => {
    const displayed = books.filter(book => {
      return book.id < page * 12 && book.id >= (page - 1) * 12;
    });
    setDisplayedBooks(displayed);
  };

  const viewBook = book => {
    setVisible(true);
    setSelectedBook(book);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div>
      <div className="Book-grid">
        {displayedBooks.map((book, index) => (
          <div className="Book-grid__item" key={index}>
            <BookItem categories={categories} book={book} view={viewBook} />
          </div>
        ))}
      </div>

      <Pagination
        pageSize={12}
        defaultCurrent={1}
        total={books.length}
        onChange={p => {
          setPage(p);
        }}
      />
      <Modal footer={null} visible={visible} onCancel={closeModal}>
        <BookModal
          categories={categories}
          book={selectedBook}
          shelves={shelves}
          onUpdateShelf={updateBooks}
        />
      </Modal>
    </div>
  );
};

export default BookList;
