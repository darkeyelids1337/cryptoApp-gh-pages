import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import CryptoInfoModal from "../CryptoInfoModal";
import AddAssetForm from "../AddAssetForm";
const headerStyle = {
  textAlign: "center",
  width: "100%",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // background: "white",
};
export default function AppHeader() {
  const { crypto } = useCrypto();
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect(true);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);
  function handleSelect(value) {
    setModal(true);
    setCoin(crypto.find(c => c.id === value))
  }
  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: "250px",
        }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
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
      <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
      <Modal
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <CryptoInfoModal coin={coin}></CryptoInfoModal>
      </Modal>
      <Drawer width={600} open={drawer} onClose={() => setDrawer(false)} destroyOnClose >
          <AddAssetForm onClose={() => setDrawer(false)}></AddAssetForm>
      </Drawer>
    </Layout.Header>
  );
}
