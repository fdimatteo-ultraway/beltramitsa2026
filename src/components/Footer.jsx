import { Link } from "react-router-dom";
import logoBeltrami from "../assets/images/LOGO_2026.png";
import logoCiclocircuiti from "../assets/images/Ciclocircuiti.png";
import logoFCI from "../assets/Logo_FCI_2023.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer-logos">
        <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={logoBeltrami} alt="Beltrami TSA" className="footer-logo" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={logoCiclocircuiti} alt="Ciclocircuiti" className="footer-logo" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
            <img src={logoFCI} alt="Federazione Ciclistica Italiana" className="footer-logo" />
        </a>
      </div>
      <div className="footer-links">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/regolamento">Regolamento</Link></li>
            <li><Link to="/classifica">Classifica</Link></li>
            <li><Link to="/comunicati">Comunicati</Link></li>
            <li><Link to="/contatti">Contatti</Link></li>
          </ul>
        </nav>
      </div>
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} Beltrami TSA Challenge. Tutti i diritti riservati.</p>
        <p>Powered by Ciclocircuiti</p>
      </div>
    </footer>
  );
};

export default Footer;
