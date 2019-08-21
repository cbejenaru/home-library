import "./book-modal.css";

import { Button, Col, Form, Rate, Row, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";

import withRate from "../../hoc/withRate";
import RateComponent from "../rate/rate";

const BookModal = ({ shelves, categories, book, onUpdateShelf, coments, setComents }) => {
  const shelfChanged = shelf => {
    setShelf(shelf);
    onUpdateShelf({ ...book, shelfId: shelf });
  };

  const takeFromShelf = () => {
    setShelf(null);
    onUpdateShelf({ ...book, shelfId: shelf });
  };

  const [shelf, setShelf] = useState();

  const saveRatings = (type, id, value) => {
    setComents([...coments, { type, id, value, createdAt: new Date() }]);
  };

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

  useEffect(() => {
    if (book) {
      setShelf(book.shelfId);
    }
  }, [book]);
  return (
    <div>
      {book && (
        <div>
          <Row>
            <Col span={8}>
              <img src={book.thumbnailUrl} alt={book.title} />
            </Col>
            <Col span={16}>
              <div className="Param">
                <div className="Label">Rating</div>
                {getRate()}
              </div>
              <div className="Param">
                <div className="Label">Title</div>
                <span>{book.title}</span>
              </div>
              <div className="Param">
                <div className="Label">Authors</div>
                <span>{book.authors.join(", ")}</span>
              </div>
              <div className="Param">
                <div className="Label">Categories</div>
                <span>
                  {book && book.categories.length > 0
                    ? book.categories.map(category => {
                        const found = categories.find(cat => cat.id === category);
                        return found ? (
                          <Tag color="#87d068" key={found.id}>
                            {found.name}
                          </Tag>
                        ) : null;
                      })
                    : "No categories"}
                </span>
              </div>
            </Col>
          </Row>
          <div className="Param">
            <div className="Label">Description</div>

            <p>{book.shortDescription}</p>
          </div>
          <div className="BookForm">
            <Form.Item label="Shelf">
              {
                <Select
                  value={shelf}
                  onChange={shelfChanged}
                  style={{ width: "200px" }}
                  placeholder="Please select a shelf"
                >
                  {shelves.map(shelf => (
                    <Select.Option
                      value={shelf.id}
                      key={shelf.id}
                      disabled={
                        shelf.categories &&
                        book.categories.reduce((acc, el) => {
                          if (acc) {
                            return acc;
                          } else if (shelf.categories.indexOf(el) < 0) {
                            return true;
                          }
                          return acc;
                        }, false)
                      }
                    >
                      {shelf.name}
                    </Select.Option>
                  ))}
                </Select>
              }
            </Form.Item>
            <Button type="primary" onClick={takeFromShelf}>
              Take from shelf
            </Button>
          </div>

          <RateComponent type="book" id={book.id} saveRatings={saveRatings} />
        </div>
      )}
    </div>
  );
};

export default withRate(BookModal);
