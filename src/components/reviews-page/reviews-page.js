import React from "react";
import { List, Rate, Button } from "antd";
import withRate from "../../hoc/withRate";

const ReviewsPage = ({ coments, setComents, books, shelves }) => {
  const getTitle = (type, id) => {
    if (type === "book") {
      const book = books.find(b => b.id === id);
      return book ? `[Book] ${book.title}` : "Undefined Book";
    }
    if (type === "shelf") {
      const shelf = shelves.find(b => b.id === id);
      return shelf ? `[Shelf] ${shelf.name}` : "Undefined Shelf";
    }
  };

  const removeReview = review => {
    const updatedComents = coments.filter(c => c.type !== review.type && c.id !== review.id);
    console.log("updatedComents: ", updatedComents);
    console.log("review: ", review);
    setComents(updatedComents);
  };

  return (
    <React.Fragment>
      <h2>Reviews list</h2>
      <List
        itemLayout="horizontal"
        dataSource={coments}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Rate disabled allowHalf value={item.value.rate} />}
              title={`${getTitle(item.type, item.id)} (${new Intl.DateTimeFormat("en-US").format(
                item.createdAt
              )})`}
              description={item.value.comment}
              key={item.id}
            />
            <Button
              onClick={() => {
                removeReview(item);
              }}
            >
              Remove
            </Button>
          </List.Item>
        )}
      />
    </React.Fragment>
  );
};

export default withRate(ReviewsPage);
