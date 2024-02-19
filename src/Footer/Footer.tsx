import logo from "./images/logo.svg";
import "./Footer.css";

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

      <a href="/" className="footer--to-top">
        Back to top
      </a>
    </div>
  </footer>
);
