import "./shelf-list.css";

import { Button, Modal } from "antd";
import React, { useState } from "react";
import uuidv1 from "uuid/v1";

import ShelfFormModal from "../shelf-form-modal/shelf-form-modal";
import ShelfModal from "../shelf-modal/shelf-modal";
import ShelfTable from "../shelf-table/shelf-table";

const ShelfList = ({ shelves, books, categories, updateShelves }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [selectedShelf, setSelectedShelf] = useState();

  const editShelf = record => {
    setEditVisible(true);
    setSelectedShelf(record);
  };

  const closeEdit = () => {
    setEditVisible(false);
    setSelectedShelf();
  };

  const createShelf = () => {
    setCreateVisible(true);
  };
  const closeCreate = () => {
    setCreateVisible(false);
  };

  const removeShelfConfirm = shelf => {
    Modal.confirm({
      title: `Remove ${shelf.name}`,
      okText: "Remove",
      cancelText: "Cancel",
      onOk: () => {
        const updatedShelfList = shelves.filter(item => item.key !== shelf.key);
        updateShelves(updatedShelfList);
      }
    });
  };

  const saveNewShelf = newShelf => {
    closeCreate();
    const id = uuidv1();
    updateShelves([...shelves, { ...newShelf, id, key: id }]);
  };

  return (
    <div>
      <Button className="AddButton" type="primary" size="large" onClick={createShelf}>
        Add a Shelf
      </Button>
      <ShelfTable
        categories={categories}
        books={books}
        shelves={shelves}
        editShelf={editShelf}
        removeShelf={removeShelfConfirm}
      />
      <Modal footer={null} visible={editVisible} onCancel={closeEdit}>
        <ShelfModal shelf={selectedShelf} books={books} categories={categories} />
      </Modal>

      <ShelfFormModal
        visible={createVisible}
        categories={categories}
        onOk={saveNewShelf}
        onCancel={closeCreate}
      />
    </div>
  );
};

export default ShelfList;
