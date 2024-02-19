/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */

import { useEffect, useState } from "react";
import "./header.css";
import { Burger } from "./burger_menu/Burger";
import { ButtonsHeader } from "./buttonsHeader/ButtonsHeader";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

export const Header = () => {
  const [isMobile, setIsMobile] = useState(false);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) => classNames(
    'header__item', { 'header-item-active': isActive },
  );

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
        <div className="header__logo-img"></div>
      </div>
      {isMobile ? (
        <div className="header__burger">
          <Burger />
        </div>
      ) : (
        <div className="header__controls">
          <div className="header__menu">
            <NavLink className={navLinkClassName} to={"home"}>
              Home
            </NavLink>
            <NavLink className={navLinkClassName} to={"phones"}>
              Phones
            </NavLink>
            <NavLink className={navLinkClassName} to={"tablets"}>
              Tablets
            </NavLink>
            <NavLink className={navLinkClassName} to={"accessories"}>
              Accessories
            </NavLink>
          </div>
          <div className="header__buttons">
            <ButtonsHeader />
          </div>
        </div>
      )}
    </header>
  );
};
