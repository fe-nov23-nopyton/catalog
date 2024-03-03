import React from "react";
import { LookingGuy } from "../../Components/LookingGuy/LookingGuy";

import { NavLink } from "react-router-dom";
import { Button } from "../../Components/UI_Kit/Button";
import { ButtonType } from "../../types/ButtonType";

import "./NotFoundPage.scss";
import { useTranslation } from "react-i18next";

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="not-found position-center">
      <LookingGuy mainMessage={t("lookingGuy.notFound")} secondMessage={t("lookingGuy.lost")} />

      <div className="not-found__button">
        <NavLink to="/catalog/home">
          <Button buttonType={ButtonType.Primary} buttonText={t("lookingGuy.goHome")} />
        </NavLink>
      </div>
    </div>
  );
};
