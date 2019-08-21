import React from "react";
import { Rate, Form, Button } from "antd";

const RateComponent = ({ type, id, saveRatings, form }) => {
  const { getFieldsValue, getFieldDecorator, setFieldsValue } = form;
  const save = e => {
    e.preventDefault();
    saveRatings(type, id, getFieldsValue());
    setFieldsValue({ rate: 0, comment: "" });
  };

  return (
    <Form layout="vertical" onSubmit={save}>
      <hr />
      <Form.Item style={{ marginBottom: 0 }} label="Rate">
        {getFieldDecorator("rate", { initialValue: 0 })(<Rate allowHalf />)}
      </Form.Item>
      <Form.Item layout="vertical" label="Comment">
        {getFieldDecorator("comment", { initialValue: "" })(
          <textarea rows="2" style={{ width: "100%" }} />
        )}
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit">
          Rate it
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create({ name: "rate" })(RateComponent);
