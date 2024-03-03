import { useEffect, useState } from "react";
import "./Header.scss";
import { Burger } from "./Burger_menu/Burger";
import { ButtonsHeader } from "./ButtonsHeader/ButtonsHeader";
import { MenuNavigation } from "./Nav/MenuNavigation";
import { Toggle } from "../Components/Toggle/Toggle";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DropdownLang } from "../Components/UI_Kit/DropdownLang/DropdownLang";

const listOfLanguages = [
  {
    code: "en",
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-us" viewBox="0 0 512 512">
        <path fill="#bd3d44" d="M0 0h512v512H0" />
        <path stroke="#fff" stroke-width="40" d="M0 58h512M0 137h512M0 216h512M0 295h512M0 374h512M0 453h512" />
        <path fill="#192f5d" d="M0 0h390v275H0z" />
        <marker id="us-a" markerHeight="30" markerWidth="30">
          <path fill="#fff" d="m15 0 9.3 28.6L0 11h30L5.7 28.6" />
        </marker>
        <path
          fill="none"
          marker-mid="url(#us-a)"
          d="m0 0 18 11h65 65 65 65 66L51 39h65 65 65 65L18 66h65 65 65 65 66L51 94h65 65 65 65L18 121h65 65 65 65 66L51 149h65 65 65 65L18 177h65 65 65 65 66L51 205h65 65 65 65L18 232h65 65 65 65 66z"
        />
      </svg>
    )
  },
  {
    code: "uk",
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ua" viewBox="0 0 512 512">
        <g fill-rule="evenodd" stroke-width="1pt">
          <path fill="gold" d="M0 0h512v512H0z" />
          <path fill="#0057b8" d="M0 0h512v256H0z" />
        </g>
      </svg>
    )
  }
];

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { i18n } = useTranslation();
  const lang = localStorage.getItem("i18nextLng");
  const currentLang = listOfLanguages.find((item) => item.code === lang);
  const langForDropdown = currentLang ? currentLang : listOfLanguages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header">
      <Link to="home">
        <div className="header__logo">
          <div className="header__logo-img" />
        </div>
      </Link>
      {isMobile ? (
        <div className="burger__layuot">
          <Burger />
        </div>
      ) : (
        <div className="header__controls">
          <div className="header__controls-nav">
            <MenuNavigation />
          </div>
          <div className="header__controls-buttons">
            <div className="header__controls-buttons-theme">
              <Toggle />
            </div>
            <div>
              <DropdownLang value={langForDropdown} list={listOfLanguages} handleClick={changeLanguage} />
            </div>
            <div className="header__controls-buttons-fav">
              <ButtonsHeader />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
