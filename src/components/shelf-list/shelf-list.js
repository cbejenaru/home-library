import React, { Component } from "react";
import { Table, Tag, Divider, Button, Rate, Modal } from "antd";
import ShelfModal from "../shelf-modal/shelf-modal";
import "./shelf-list.css";

class ShelfList extends Component {
  columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => <b>{text}</b>
    },
    {
      title: "Number of books",
      dataIndex: "booksCount",
      key: "booksCount",
      render: count => <span>{count > 0 ? count : "No books"}</span>
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: rating => (
        <span>
          <Rate disabled allowHalf defaultValue={rating} />
        </span>
      )
    },
    {
      title: "Categories",
      key: "categories",
      dataIndex: "categories",
      render: categories => (
        <span>
          {categories.lengt > 0
            ? categories.map(tag => (
                <Tag color="#87d068" key={tag}>
                  {tag}
                </Tag>
              ))
            : "No tags"}
        </span>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={this.openModal.bind(this, record)}>
            Info
          </Button>
          <Divider type="vertical" />
          <Button type="link" onClick={this.removeShelfConfirm.bind(this, record)}>
            Delete
          </Button>
        </span>
      )
    }
  ];
  state = {
    modalVisible: false,
    shelves: [
      {
        key: "1",
        name: "Shelf 1",
        booksCount: 0,
        rating: 0,
        categories: ["test"]
      },
      {
        key: "2",
        name: "Shelf 2",
        booksCount: 0,
        rating: 0,
        categories: ["test2"]
      },
      {
        key: "3",
        name: "Shelf 3",
        booksCount: 0,
        rating: 0,
        categories: []
      }
    ]
  };

  openModal(record) {
    console.log("record: ", record);
    this.setState({ selectedShelf: record, modalVisible: true });
  }
  closeModal() {
    this.setState({ selectedShelf: null, modalVisible: false });
  }

  removeShelfConfirm(shelf) {
    Modal.confirm({
      title: `Remove ${shelf.name}`,
      okText: "Remove",
      cancelText: "Cancel",
      onOk: () => {
        const updatedShelfList = this.state.shelves.filter(item => item.key !== shelf.key);
        this.setState({ shelves: [...updatedShelfList] });
      }
    });
  }

  okPressed() {
    if (this.state.selectedShelf) {
    }
  }

  render() {
    return (
      <div>
        <Button className="AddButton" type="primary" size="large">
          Add a Shelf
        </Button>
        <Table columns={this.columns} dataSource={this.state.shelves} />
        <ShelfModal
          visible={this.state.modalVisible}
          shelf={this.state.selectedShelf}
          onOk={this.okPressed}
          onCancel={this.closeModal.bind(this)}
        />
      </div>
    );
  }
}

export default ShelfList;
