import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import SolusiProduct from "./pages/SolusiProduct";
import AboutSandbox from "./pages/AboutSandbox";
import Help from "./pages/Help";
import SolusiDetail from "./pages/SolusiDetail";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/solusi-produk" element={<SolusiProduct />} />
         <Route path="/solusi-produk/:slug" element={<SolusiDetail />} />
        <Route path="/tentang-sandbox" element={<AboutSandbox />} />
        <Route path="/bantuan" element={<Help />} />
      </Route>
    </Routes>
  );
}

export default App;
