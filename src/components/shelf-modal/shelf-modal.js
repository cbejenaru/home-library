import { Modal, Row, Col, Rate, Tag } from "antd";
import React from "react";
import "./shelf-modal.css";

const ShelfModal = ({ shelf, categories, visible, onOk, onCancel }) => {
  return (
    <Modal footer={null} shelf={shelf} visible={visible} onOk={onOk} onCancel={onCancel}>
      {shelf && (
        <React.Fragment>
          <h4>{shelf.name}</h4>
          <Row>
            <Col span={10}>Rating</Col>
            <Col span={14}>
              <Rate disabled allowHalf defaultValue={shelf.rating} />
            </Col>
          </Row>
          <Row>
            <Col span={10}>Categories</Col>
            <Col span={14}>
              {shelf.categories.map(cat => {
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
              })}
            </Col>
          </Row>
          <Row>
            <Col span={10}>Books</Col>
          </Row>
          <Row>
            {shelf.books.map(book => {
              return <div className="Books-row">book.title</div>;
            })}
          </Row>
        </React.Fragment>
      )}
    </Modal>
  );
};

export default ShelfModal;
