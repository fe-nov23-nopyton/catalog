import classNames from "classnames";
import "../Nav/MenuNavigation.scss";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface MenuProps {
  burger?: boolean;
}

export const MenuNavigation: React.FC<MenuProps> = ({ burger }) => {
  const { t } = useTranslation();

  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    classNames("nav__link-item", { "nav-item-active": isActive });

  return (
    <div className={classNames({ burger__container: burger, nav__menu: !burger })}>
      <NavLink className={navLinkClassName} to={"/catalog/home"}>
        {t("header.home")}
      </NavLink>
      <NavLink className={navLinkClassName} to={"phones"}>
        {t("header.phones")}
      </NavLink>
      <NavLink className={navLinkClassName} to={"tablets"}>
        {t("categories.tablets")}
      </NavLink>
      <NavLink className={navLinkClassName} to={"accessories"}>
        {t("categories.accessories")}
      </NavLink>
    </div>
  );
};
