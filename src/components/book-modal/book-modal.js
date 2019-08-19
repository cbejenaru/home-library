import React, { Component } from "react";
import { Modal } from "antd";

class BookModal extends Component {
  state = {};
  render() {
    const { book, visible, onOk } = this.props;
    return (
      <Modal shelf={shelf} visible={visible} onOk={onOk}>
        {shelf && (
          <span>
            <p>{shelf.name}</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </span>
        )}
      </Modal>
    );
  }
}

export default BookModal;
