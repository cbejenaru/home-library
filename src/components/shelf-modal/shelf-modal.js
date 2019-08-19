import { Modal, Row, Col, Rate, Tag } from "antd";
import React, { Component } from "react";

class ShelfModal extends Component {
  state = { shelf: this.props.shelf };

  removeCategory(name) {
    this.setState((prevState, props) => {
      console.log("prevState: ", prevState);
      return {
        shelf: {
          ...prevState.shelf,
          categories: prevState.shelf.categories.filter(cat => cat !== name)
        }
      };
    });
  }

  render() {
    const { shelf, visible, onOk, onCancel } = this.props;
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
                {shelf.categories.map(cat => (
                  <Tag
                    closable
                    onClose={this.removeCategory.bind(this, cat)}
                    color="#87d068"
                    key={cat}
                  >
                    {cat}
                  </Tag>
                ))}
              </Col>
            </Row>
          </React.Fragment>
        )}
      </Modal>
    );
  }
}

export default ShelfModal;
