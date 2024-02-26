import React, { useEffect, useState } from "react";
import "./Modal.scss";
import { useAppDispatch } from "../../redux/hooks";
import { deleteCartItems } from "../../redux/features/cartSlice";

export const Modal = () => {
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const timerId = setTimeout(() => {
      dispatch(deleteCartItems());
      window.location.href = "/catalog/home";
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div className={active ? "modal__content active" : "modal__content"}>
        <div className="modal__image" />
        <h2 className="modal__title">Congrats!</h2>
        <h3 className="modal__thanks">Thank you for your purchase!</h3>
        <p className="modal__subtitle">We appreciate your purchase. Enjoy your products!</p>
      </div>
    </div>
  );
};
