import "./book-item.css";

import { Rate, Tag } from "antd";
import React from "react";

const BookItem = props => {
  const { title, thumbnailUrl, authors, categories, rating, onShelf } = props.book;
  return (
    <div className="Book">
      <div className="Book__image" style={{ backgroundImage: "url(" + thumbnailUrl + ")" }} />
      <div className="Book__info">
        <div className="Book__title">{title}</div>
        <div className="Book__author">{authors.join(", ")}</div>
        <div className="Book__categories">
          {categories.map(element => (
            <Tag color="#87d068" key={element}>
              {element}
            </Tag>
          ))}
        </div>
        <div className="Book__rate">
          <Rate disabled allowHalf defaultValue={rating} />
        </div>
      </div>
    </div>
  );
};

export default BookItem;
