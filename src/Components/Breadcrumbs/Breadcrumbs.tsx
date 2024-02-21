import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrumbs.scss";

interface Props {
  path: string;
}

export const Breadcrumbs: React.FC<Props> = ({ path }) => {
  const pathParts = path.split("/").filter(Boolean);

  return (
    <nav className="breadcrumbs-nav">
      {pathParts.map((part, index) => {
        const normalizedPart = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        const isLast = index < pathParts.length - 1;
        const linkTo = normalizedPart === "Catalog" ? "/catalog/" : `/${pathParts.slice(0, index + 1).join("/")}`;
        const namePage = normalizedPart === "Catalog" ? null : normalizedPart;

        return (
          <>
            <Link className={normalizedPart === "Catalog" ? "home-icon" : "link-breadcrumbs"} to={linkTo}>
              {namePage}
            </Link>
            {isLast && <span className="vector-right" />}
          </>
        );
      })}
    </nav>
  );
};
