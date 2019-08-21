import "./shelf-form-modal.css";

import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect } from "react";

const ShelfFormModal = ({ categories, visible, onOk, onCancel, form }) => {
  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched,
    getFieldsValue,
    resetFields
  } = form;
  const nameError = isFieldTouched("name") && getFieldError("name");

  useEffect(() => {
    form.validateFields();
  }, [visible]);

  const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onOk(getFieldsValue());
    resetFields();
  };
  return (
    <Modal footer={null} visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form onSubmit={handleSubmit}>
        <Form.Item label="Name" validateStatus={nameError ? "error" : ""} help={nameError || ""}>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Name is required!" }]
          })(<Input placeholder="Name" />)}
        </Form.Item>
        <Form.Item label="Categories">
          {getFieldDecorator("categories")(
            <Select mode="multiple" placeholder="Please select shelf categories">
              {categories &&
                categories
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(category => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
            </Select>
          )}
        </Form.Item>
        <div className="FormActions">
          <Form.Item className="CreateButton">
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
              Create
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={onCancel}>
              Cancel
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default Form.create({ name: "shelf-form" })(ShelfFormModal);
