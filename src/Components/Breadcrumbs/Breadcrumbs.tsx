import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.scss";
import { Button } from "../UI_Kit/Button";
import { ButtonType } from "../../types/ButtonType";

interface Props {
  path: string;
}

export const Breadcrumbs: React.FC<Props> = ({ path }) => {
  const pathParts = path.split("/").filter(Boolean);

  return (
    <nav className="breadcrumbs-nav">
      {pathParts.map((part, index) => {
        const normalizedPart = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        const linkTo = normalizedPart === "Catalog" ? "/catalog/" : `/${pathParts.slice(0, index + 1).join("/")}`;
        const namePage = normalizedPart === "Catalog" ? null : normalizedPart;

        return (
          <React.Fragment key={index}>
            <Link className={normalizedPart === "Catalog" ? "home-icon" : "link-breadcrumbs"} to={linkTo}>
              {namePage && <Button buttonType={ButtonType.Navigation} buttonText={namePage} isArrowRight={true} />}
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
};
