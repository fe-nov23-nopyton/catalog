import { TempCardGalery } from "./TempCardGalery";
import "./TempCardLayout.scss";
import "./TempCard.scss";
import { useEffect } from "react";

export const TempCardLayout = () => {
  useEffect(() => {
    document.body.style.overflowY = "scroll";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div>
      <div className="skeleton__cardLayout__breadCrumbs skeleton__bg" />
      <div style={{ textAlign: "left", margin: "40px 0 0 0" }}>
        <div className="skeleton__cardLayout__button-home skeleton__bg" />
      </div>
      <div className="skeleton__cardLayout">
        <div className="skeleton__cardLayout__header skeleton__bg" />
        <div className="skeleton__cardLayout__pictures">
          <TempCardGalery />
        </div>
        <div className="skeleton__cardLayout__options">
          <div className="skeleton__cardLayout__options-id skeleton__bg" />
          <div className="skeleton__cardLayout__options-color">
            <div className="skeleton__cardLayout__options-color-text skeleton__bg" />
            <div className="skeleton__cardLayout__options-color-select">
              <div className="skeleton__cardLayout__options-color-select__icons skeleton__bg" />
              <div className="skeleton__cardLayout__options-color-select__icons skeleton__bg" />
              <div className="skeleton__cardLayout__options-color-select__icons skeleton__bg" />
              <div className="skeleton__cardLayout__options-color-select__icons skeleton__bg" />
            </div>
          </div>
          <div className="skeleton__cardLayout__options-capacity">
            <div className="skeleton__cardLayout__options-capacity-text skeleton__bg" />

            <div className="skeleton__cardLayout__options-capacity-select">
              <div className="skeleton__cardLayout__options-capacity-select__ram skeleton__bg" />
            </div>
          </div>
          <div className="skeleton__cardLayout__options-price">
            <div className="skeleton__cardLayout__options-price-content">
              <div className="skeleton__cardLayout__options-price-regular skeleton__bg" />
              <div className="skeleton__cardLayout__options-price-disc skeleton__bg" />
            </div>
            <div className="skeleton__cardLayout__options-price-controls">
              <div className="skeleton__cardLayout__options-price-controls-add skeleton__bg" />
              <div className="skeleton__cardLayout__options-price-controls-fav skeleton__bg" />
            </div>
          </div>
          <div className="skeleton__cardLayout__options-info">
            <div
              className="skeleton__details"
              style={{ width: "100%", display: "flex", gap: "10px", flexDirection: "column" }}
            >
              <div className="skeleton__feature">
                <p className="skeleton__feature-name skeleton__bg" />

                <p className="skeleton__feature-value skeleton__bg" style={{ width: "30px" }} />
              </div>
              <div className="skeleton__feature">
                <p className="skeleton__feature-name skeleton__bg" style={{ width: "75px" }} />

                <p className="skeleton__feature-value skeleton__bg" style={{ width: "40px" }} />
              </div>
              <div className="skeleton__feature">
                <p className="skeleton__feature-name skeleton__bg" style={{ width: "55px" }} />

                <p className="skeleton__feature-value skeleton__bg" style={{ width: "40px" }} />
              </div>
              <div className="skeleton__feature">
                <p className="skeleton__feature-name skeleton__bg" style={{ width: "38px" }} />

                <p className="skeleton__feature-value skeleton__bg" style={{ width: "28px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
