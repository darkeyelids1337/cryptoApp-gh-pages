import { Divider, Flex, Tag, Typography } from "antd";
export default function CryptoInfoModal({ coin }) {
  return (
    <>
      <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        ></img>
        <Typography.Title level={2} style={{ margin: 0 }}>
          ({coin.symbol}) {coin.name}
        </Typography.Title>
      </Flex>
      <Divider></Divider>
      <Typography.Paragraph>
        <Typography.Text strong>1 hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
          {coin.priceChange1h}
        </Tag>
        <Typography.Text strong>1 day: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
          {coin.priceChange1d}
        </Tag>
        <Typography.Text strong>1 week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
          {coin.priceChange1w}
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price: {coin.price.toFixed(2)}$</Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>PriceBTC: {coin.priceBtc.toFixed(2)}</Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market Cap: {coin.marketCap.toFixed(2)}$</Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Contract Address: {coin.contractAddress?? 'No Address'}</Typography.Text>
      </Typography.Paragraph>
    </>
  );
}
