import "./ButtonsHeader.scss";
import { useAppSelector } from "../../redux/hooks";
import IconCount from "../../Components/IconCount/IconCount";
import { NavLink } from "react-router-dom";
import { navLinkClassName } from "../../utils/navLinkClassName";

export const ButtonsHeader = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const { favorites } = useAppSelector((state) => state.favorites);

  return (
    <>
      <NavLink className={navLinkClassName} to={"/catalog/favorites"}>
        <div className="icon-favorite">
          <IconCount items={favorites} />
        </div>
      </NavLink>
      <NavLink className={navLinkClassName} to={"/catalog/cart"}>
        <div className="icon-cart">
          <IconCount items={cart} />
        </div>
      </NavLink>
    </>
  );
};
