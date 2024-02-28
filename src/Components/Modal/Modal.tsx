import { useEffect, useState, useContext } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { deleteCartItems } from "../../redux/features/cartSlice";
import { ThemeContext } from "../../ThemeContext/ThemeContext";

import "./Modal.scss";

export const Modal = () => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setActive(true);
    const timerId = setTimeout(() => {
      dispatch(deleteCartItems());
      window.location.href = "/catalog/home";
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div
      className={`modal ${active ? "active" : ""} ${theme === "dark-theme" ? "dark-theme" : ""}`}
      onClick={() => setActive(false)}
    >
      <div className={`modal__content ${active ? "active" : ""}`}>
        <div className="modal__image" />
        <h2 className="modal__title">Congrats!</h2>
        <h3 className="modal__thanks">Thank you for your purchase!</h3>
        <p className="modal__subtitle">We appreciate your purchase. Enjoy your products!</p>
      </div>
    </div>
  );
};
