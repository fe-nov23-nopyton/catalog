/* eslint-disable react/self-closing-comp */
/* eslint-disable arrow-body-style */

import { useEffect, useState } from "react";
import "./Burger.scss";
import { ButtonsHeader } from "../ButtonsHeader/ButtonsHeader";
import { useLocation } from "react-router-dom";
import { MenuNavigation } from "../Nav/MenuNavigation";

export const Burger = () => {
  const location = useLocation();
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menuClass, setMenuClass] = useState("burger__menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

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
        <MenuNavigation />
        <div className="menu__footer">
          <ButtonsHeader />
        </div>
      </div>
    </div>
  );
};
