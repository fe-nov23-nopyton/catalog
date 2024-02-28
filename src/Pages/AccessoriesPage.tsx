import React from "react";
import { LookingGuy } from "../Components/LookingGuy/LookingGuy";

import "../App.scss";

export const AccessoriesPage: React.FC = () => (
  <div className="position-center">
    <LookingGuy
      mainMessage="Currently, there are no items to display."
      secondMessage="However, stay tuned as items will appear shortly. Thank you for your patience."
    />
  </div>
);
