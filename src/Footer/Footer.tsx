import logoLight from "./images/logo_light.svg";
import logoDark from "./images/logo_dark.svg";
import "./Footer.scss";
import { Link } from "react-router-dom";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

interface Props {
  theme: string;
}

export const Footer: React.FC<Props> = ({ theme }) => (
  <footer className="footer">
    <div className="container footer--container">
      <a href="/" className="footer--logo">
        <img alt="Nice Gadgets logo" src={theme === "light-theme" ? logoLight : logoDark} />
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
