import logo from "./images/logo.svg";
import "./Footer.scss";
import { Link } from "react-router-dom";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container footer--container">
      <a href="/" className="footer--logo">
        <img alt="Logo" src={logo} />
      </a>

      <ul className="footer--list">
        <li className="footer--list-item">Githab</li>
        <li className="footer--list-item">Contacts</li>
        <li className="footer--list-item">Rights</li>
      </ul>

      <Link to="#" className="footer--to-top" onClick={scrollToTop}>
        Back to top
      </Link>
    </div>
  </footer>
);
