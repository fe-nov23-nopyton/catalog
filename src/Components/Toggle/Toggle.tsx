import React, { useContext, useState } from "react";
import "./Toggle.scss"; // You can define your CSS for day/night mode styles
import { ThemeContext } from "../../ThemeContext/ThemeContext";

export const Toggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div onClick={toggleTheme} className={`toggle${theme !== "light-theme" ? " night" : ""}`}>
      <div className="notch">
        <div className="crater" />
        <div className="crater" />
      </div>
      <div>
        <div className="shape sm" />
        <div className="shape sm" />
        <div className="shape md" />
        <div className="shape lg" />
      </div>
    </div>
  );
};
