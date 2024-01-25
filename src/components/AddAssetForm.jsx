import { useState, useRef } from "react";
import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  Result,
  Button,
  InputNumber,
  DatePicker,
} from "antd";
import { useCrypto } from "../context/crypto-context";

const validateMessages = {
  reguired: "${label} is required!",
  types: {
    number: "${label} in not valid number",
  },
  number: {
    range: "${label} must be in ${max} and ${min} range",
  },
};
export default function AddAssetForm({onClose}) {
  const [form] = Form.useForm();
  const { crypto, addAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }
  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            ></img>{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }
  function onFinish(values) {
    const newAsset = {
        id: coin.id,
        amount: values.amount,
        price: values.price,
        date: values.date?.$d ?? new Date()
    }
    assetRef.current = newAsset;
    addAsset(newAsset);
    setSubmitted(true);
  }
  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: value * price,
    });
  }
  function handlePriceChange(value) {
    const amount = form.getFieldValue("amout");
    form.setFieldsValue({
      total: amount * value,
    });
  }
  return (
    <Form
      name="basic"
      form={form}
      validateMessages={validateMessages}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{ price: +coin.price.toFixed(2) }}
      onFinish={onFinish}
    >
      <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        ></img>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {coin.name}
        </Typography.Title>
      </Flex>
      <Divider></Divider>
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date&Time" name="date">
        <DatePicker showTime></DatePicker>
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
