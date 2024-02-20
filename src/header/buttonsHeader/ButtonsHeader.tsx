import { Link } from "react-router-dom";
import "./buttonsHeader.scss";
import { useAppSelector } from "../../redux/hooks";
import IconCount from "../../Components/IconCount/IconCount";

export const ButtonsHeader = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const { favorites } = useAppSelector((state) => state.favorites);

  return (
    <>
      <Link className="buttons_header" to={"/favorites"}>
        <div className="icon-favorite">
          <IconCount items={favorites} />
        </div>
      </Link>
      <Link className="buttons_header" to={"/cart"}>
        <div className="icon-cart">
          <IconCount items={cart} />
        </div>
      </Link>
    </>
  );
};
