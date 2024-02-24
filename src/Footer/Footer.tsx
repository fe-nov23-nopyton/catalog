import logoLight from "../images/Logo.svg";
import logoDark from "../images/Logo-dark.svg";
import "./Footer.scss";
import { Link } from "react-router-dom";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

interface Props {
  theme: string;
}

export const Footer: React.FC<Props> = ({ theme }) => (
  <footer className="footer">
    <div className="container footer__container">
      <Link to="home" className="footer__logo">
        <img alt="Nice Gadgets logo" src={theme === "light-theme" ? logoLight : logoDark} />
      </Link>

      <ul className="footer__list">
        <li className="footer__list-item">Github</li>
        <li className="footer__list-item">Contacts</li>
        <li className="footer__list-item">Rights</li>
      </ul>

      <Link to="#" className="footer__to-top" onClick={scrollToTop}>
        Back to top
      </Link>
    </div>
  </footer>
);
