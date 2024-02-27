import React from "react";

import "../Pages/NotFoundPage.scss";

export const NotFoundPage: React.FC = () => (
  <div className="not-found">
    <div className="looking-guy forward">
      <div className="eye left-eye" />
      <div className="eye right-eye" />
    </div>
    <h1 className="not-found__title">404 - Page not found</h1>
    <p className="not-found__message">Oops! It seems like you got lost...</p>
    <a href="/catalog/home" className="not-found__home-link">
      Go back to Home
    </a>
  </div>
);
