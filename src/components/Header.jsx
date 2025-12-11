import { Link } from "react-router-dom";
import logo from "../assets/images/LOGO_2026.png";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="Beltrami TSA Challenge 2026" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/regolamento">Regolamento</Link>
          </li>
          <li>
            <Link to="/classifica">Classifica</Link>
          </li>
          <li>
            <Link to="/comunicati">Comunicati</Link>
          </li>
          <li>
            <Link to="/contatti">Contatti</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
