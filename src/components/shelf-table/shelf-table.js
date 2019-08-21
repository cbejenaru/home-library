import { Table, Tag, Rate, Divider, Button } from "antd";
import withRate from "../../hoc/withRate";

import React from "react";
const ShelfTable = ({ coments, books, shelves, categories, editShelf, removeShelf }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => <b>{text}</b>
    },
    {
      title: "Number of books",
      dataIndex: "id",
      key: "id",
      render: id => {
        const foundBooks = books.filter(b => b.shelfId === id);
        return <span>{foundBooks.length}</span>;
      }
    },
    {
      title: "Rating",
      dataIndex: "id",
      key: "id",
      render: id => <span>{getRate(id)}</span>
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

  const getRate = id => {
    const foundComents = coments.filter(c => c.id === id);
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
  return <Table columns={columns} categories={categories} dataSource={shelves} />;
};

export default withRate(ShelfTable);
