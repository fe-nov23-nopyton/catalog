import React from "react";
import { LookingGuy } from "../Components/LookingGuy/LookingGuy";

import "../App.scss";
import { useTranslation } from "react-i18next";

export const TabletsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="position-center">
      <LookingGuy mainMessage={t("lookingGuy.mainMessage")} secondMessage={t("lookingGuy.secondMessage")} />
    </div>
  );
};
