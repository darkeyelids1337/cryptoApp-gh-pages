
import "./App.css";
import { CryptoContextProvider } from "./context/crypto-context";
import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <>
      <CryptoContextProvider>
        <AppLayout></AppLayout>
      </CryptoContextProvider>
    </>
  );
}

export default App;
