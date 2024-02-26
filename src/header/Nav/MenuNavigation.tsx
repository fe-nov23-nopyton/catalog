import classNames from "classnames";
import "../Nav/MenuNavigation.scss";
import { NavLink } from "react-router-dom";

interface MenuProps {
  burger?: boolean;
}

export const MenuNavigation: React.FC<MenuProps> = ({ burger }) => {
  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    classNames("nav__link-item", { "nav-item-active": isActive });
  return (
    <div className={classNames({ burger__container: burger, nav__menu: !burger })}>
      <NavLink className={navLinkClassName} to={"/catalog/home"}>
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
  );
};
