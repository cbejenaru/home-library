import "./shelf-modal.css";

import { Col, Rate, Row, Tag } from "antd";
import React from "react";

import withRate from "../../hoc/withRate";
import RateComponent from "../rate/rate";

const ShelfModal = ({ shelf, categories, books, coments, setComents }) => {
  const renderBooks = () => {
    const booksToRender = books.filter(book => {
      return book.shelfId === shelf.id;
    });
    return booksToRender.length > 0 ? (
      booksToRender.map(book => {
        return (
          <div className="Books-row" key={book.id}>
            {book.title}
          </div>
        );
      })
    ) : (
      <span>No books</span>
    );
  };

  const saveRatings = (type, id, value) => {
    setComents([...coments, { type, id, value }]);
  };

  const getRate = () => {
    const foundComents = coments.filter(c => c.id === shelf.id);
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
    <div>
      {shelf && (
        <React.Fragment>
          <Col span={10}>Name</Col>
          <Col span={14}>
            <h4>{shelf.name}</h4>
          </Col>
          <Row>
            <Col span={10}>Rating</Col>
            <Col span={14}>{coments && getRate()}</Col>
          </Row>
          <Row>
            <Col span={10}>Categories</Col>
            <Col span={14}>
              {shelf.categories
                ? shelf.categories.map(cat => {
                    const foundCategory = categories.find(category => category.id === cat);
                    return foundCategory ? (
                      <Tag
                        closable
                        onClose={() => {
                          shelf.categories.pop(shelf.categories.indexOf(cat));
                        }}
                        color="#87d068"
                        key={foundCategory.id}
                      >
                        {foundCategory.name}
                      </Tag>
                    ) : null;
                  })
                : "No categories"}
            </Col>
          </Row>
          <Row>
            <Col span={10}>Books</Col>
          </Row>
          <Row>{renderBooks()}</Row>
          <RateComponent type="shelf" id={shelf.id} saveRatings={saveRatings} />
        </React.Fragment>
      )}
    </div>
  );
};

export default withRate(ShelfModal);
