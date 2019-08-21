import "./book-item.css";

import { Rate, Tag } from "antd";
import React from "react";

import withRate from "../../hoc/withRate";

const BookItem = ({ book, view, categories, coments }) => {
  const getRate = () => {
    const foundComents = coments.filter(c => c.id === book.id && c.type === "book");

    return (
      <Rate
        disabled
        allowHalf
        value={
          foundComents.reduce((acc, el) => {
            return acc + el.value.rate;
          }, 0) / foundComents.length
        }
      />
    );
  };
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
        <div className="Book__rate">{getRate()}</div>
      </div>
    </div>
  );
};

export default withRate(BookItem);
