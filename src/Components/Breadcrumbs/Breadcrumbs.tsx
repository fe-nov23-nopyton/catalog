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
      <Link to="/">
        <span className="home-icon" />
      </Link>
      <span className="vector-right" />

      {pathParts.map((part, index) => {
        const normalizedPart = part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        return (
          <span key={index}>
            <Link className="link-breadcrumbs" to={`/${pathParts.slice(0, index + 1).join("/")}`}>
              {normalizedPart}
            </Link>
            {index < pathParts.length - 1 && <span className="vector-right" />}
          </span>
        );
      })}
    </nav>
  );
};
