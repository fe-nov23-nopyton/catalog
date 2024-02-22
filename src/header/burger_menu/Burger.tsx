/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */

import { useEffect, useState } from "react";
import "./burger.scss";
import { ButtonsHeader } from "../buttonsHeader/ButtonsHeader";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";

export const Burger = () => {
  const location = useLocation();
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("burger__menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    classNames("menu__item", { "header-item-active": isActive });

  const updateMenu = () => {
    const newBurgerClass = isMenuClicked ? "burger-bar unclicked" : "burger-bar clicked";
    const newMenuClass = isMenuClicked ? "burger__menu hidden" : "burger__menu visible";
    document.body.style.overflow = !isMenuClicked ? "hidden" : "auto";

    setBurgerClass(newBurgerClass);
    setMenuClass(newMenuClass);
    setIsMenuClicked(!isMenuClicked);
  };

  useEffect(() => {
    setBurgerClass("burger-bar unclicked");
    setMenuClass("burger__menu hidden");
    setIsMenuClicked(false);
    document.body.style.overflow = "auto";
  }, [location]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="burger__container">
      <nav className="burger__container-burger">
        <div className="burger" onClick={updateMenu}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
      </nav>
      <div className={menuClass}>
        <div className="menu__container">
          <NavLink className={navLinkClassName} to={"/catalog/"}>
            Home
          </NavLink>
          <NavLink className={navLinkClassName} to={"/phones"}>
            Phones
          </NavLink>
          <NavLink className={navLinkClassName} to={"/tablets"}>
            Tablets
          </NavLink>
          <NavLink className={navLinkClassName} to={"/accessories"}>
            Accessories
          </NavLink>
        </div>
        <div className="menu__footer">
          <ButtonsHeader />
        </div>
      </div>
    </div>
  );
};
