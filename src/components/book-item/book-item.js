import "./book-item.css";

import { Rate, Tag } from "antd";
import React from "react";

const BookItem = ({ book, view, categories }) => {
  return (
    <div
      className="Book"
      onClick={() => {
        view(book);
      }}
    >
      <div className="Book__image" style={{ backgroundImage: "url(" + book.thumbnailUrl + ")" }} />
      <div className="Book__info">
        <div className="Book__title">{book.title}</div>
        <div className="Book__author">{book.authors.join(", ")}</div>
        <div className="Book__categories">
          {book.categories.map(element => {
            const category = categories.find(c => c.id === element);
            return (
              <Tag color="#87d068" key={category.id}>
                {category.name}
              </Tag>
            );
          })}
        </div>
        <div className="Book__rate">
          <Rate disabled allowHalf defaultValue={book.rating} />
        </div>
      </div>
    </div>
  );
};

export default BookItem;
