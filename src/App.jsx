import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Regolamento from "./pages/Regolamento";
import Classifica from "./pages/Classifica";
import Contatti from "./pages/Contatti";
import Comunicati from "./pages/Comunicati";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/regolamento" element={<Regolamento />} />
        <Route path="/classifica" element={<Classifica />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/comunicati" element={<Comunicati />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
