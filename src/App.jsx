import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Regolamento from "./pages/Regolamento";
import Classifica from "./pages/Classifica";
import Contatti from "./pages/Contatti";
import Comunicati from "./pages/Comunicati";
import Accedi from "./pages/Accedi";
import "./App.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/regolamento" element={<Regolamento />} />
          <Route path="/classifica" element={<Classifica />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/comunicati" element={<Comunicati />} />
          <Route path="/accedi" element={<Accedi />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
