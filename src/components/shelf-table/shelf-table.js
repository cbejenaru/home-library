import { Table, Tag, Rate, Divider, Button } from "antd";

import React from "react";
const ShelfTable = ({ shelves, categories, editShelf, removeShelf }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => <b>{text}</b>
    },
    {
      title: "Number of books",
      dataIndex: "books",
      key: "books",
      render: books => <span>No books</span>
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
      render: shelfCategories => (
        <span>
          {shelfCategories && shelfCategories.length > 0
            ? shelfCategories.map(category => {
                const found = categories.find(cat => cat.id === category);

                return found ? (
                  <Tag color="#87d068" key={category}>
                    {found.name}
                  </Tag>
                ) : null;
              })
            : "No tags"}
        </span>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              editShelf(record);
            }}
          >
            Info
          </Button>
          <Divider type="vertical" />
          <Button
            type="link"
            onClick={() => {
              removeShelf(record);
            }}
          >
            Delete
          </Button>
        </span>
      )
    }
  ];
  return <Table columns={columns} categories={categories} dataSource={shelves} />;
};

export default ShelfTable;
