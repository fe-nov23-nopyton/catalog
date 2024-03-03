import React, { useEffect, useState, useContext } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { deleteCartItems } from "../../redux/features/cartSlice";
import { ThemeContext } from "../../ThemeContext/ThemeContext";
import { useNavigate } from "react-router-dom";

import "./Modal.scss";
import { useTranslation } from "react-i18next";

export const Modal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  useEffect(() => {
    setActive(true);
    const timerId = setTimeout(() => {
      dispatch(deleteCartItems());
      navigate("/catalog/home");
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <div>
      <div
        className={`modal ${active ? "active" : ""} ${theme === "dark-theme" ? "dark-theme" : ""}`}
        onClick={() => setActive(false)}
      >
        <div className={`modal__content ${active ? "active" : ""}`}>
          <div className="modal__image" />
          <h2 className="modal__title">{t("cartPage.checkoutSummary.congrats")}</h2>
          <h3 className="modal__thanks">{t("cartPage.checkoutSummary.thanks")}</h3>
          <p className="modal__subtitle">{t("cartPage.checkoutSummary.appreciate")}</p>
        </div>
      </div>
      {active && <div className="modal-overlay" />}
    </div>
  );
};
