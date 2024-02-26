import { useEffect, useState } from "react";
import "./Header.scss";
import { Burger } from "./Burger_menu/Burger";
import { ButtonsHeader } from "./ButtonsHeader/ButtonsHeader";
import { ToggleThemeButton } from "./toggleThemeButton/ToggleThemeButton";
import { MenuNavigation } from "./Nav/MenuNavigation";
import { Toggle } from "../Components/Toggle/Toggle";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__logo">
        <div className="header__logo-img" />
      </div>
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
            <div className="header__controls-buttons-fav">
              <ButtonsHeader />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
