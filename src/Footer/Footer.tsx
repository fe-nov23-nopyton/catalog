import logoLight from "../images/Logo.svg";
import logoDark from "../images/Logo-dark.svg";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

interface Props {
  theme: string;
}

export const Footer: React.FC<Props> = ({ theme }) => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer__container">
        <Link to="home" className="footer__logo">
          <img alt="Nice Gadgets logo" src={theme === "light-theme" ? logoLight : logoDark} />
        </Link>

        <ul className="footer__list">
          <a href="https://github.com/fe-nov23-nopyton/catalog" target="_blank" className="footer__list-item">
            Github
          </a>
          <Link to="/catalog/contacts" className="footer__list-item">
            {t("footer.contacts")}
          </Link>
          <li className="footer__list-item">{t("footer.rights")}</li>
        </ul>

        <Link to="#" className="footer__to-top" onClick={scrollToTop}>
          {t("footer.backToTop")}
        </Link>
      </div>
    </footer>
  );
};
