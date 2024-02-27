import React from "react";
import "../TempCard/TempCard.scss";

export const TempCard = () => (
  <div className="skeleton">
    <div className="skeleton__link">
      <div className="skeleton__image-container">
        <div className="skeleton__image skeleton__bg" />
      </div>
    </div>

    <div className="skeleton__details">
      <div className="skeleton__link-name">
        <h2 className="skeleton__details-name skeleton__bg" />
      </div>

      <div className="skeleton__price">
        <p className="skeleton__price--actual skeleton__bg" />
        <p className="skeleton__price--old skeleton__bg" />
      </div>

      <div className="skeleton__feature">
        <p className="skeleton__feature-name skeleton__bg" />

        <p className="skeleton__feature-value skeleton__bg" style={{ width: "75px" }} />
      </div>
      <div className="skeleton__feature">
        <p className="skeleton__feature-name skeleton__bg" style={{ width: "75px" }} />

        <p className="skeleton__feature-value skeleton__bg" style={{ width: "40px" }} />
      </div>
      <div className="skeleton__feature">
        <p className="skeleton__feature-name skeleton__bg" style={{ width: "38px" }} />

        <p className="skeleton__feature-value skeleton__bg" style={{ width: "28px" }} />
      </div>
    </div>

    <div className="skeleton__buttons">
      <div className="skeleton-button-add skeleton__bg" />
      <div className="skeleton-button-fav skeleton__bg" />
    </div>
  </div>
);
