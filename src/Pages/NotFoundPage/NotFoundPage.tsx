import React from "react";
import { LookingGuy } from "../../Components/LookingGuy/LookingGuy";

import "./NotFoundPage.scss";
import { NavLink } from "react-router-dom";
import { Button } from "../../Components/UI_Kit/Button";
import { ButtonType } from "../../types/ButtonType";

export const NotFoundPage: React.FC = () => (
  <div className="not-found">
    <LookingGuy mainMessage="404 - Page not found" secondMessage="Oops! It seems like you got lost..." />
    <div className="not-found__button">
      <NavLink to="/catalog/home">
        <Button buttonType={ButtonType.Primary} buttonText="Go back to home" />
      </NavLink>
    </div>
  </div>
);
