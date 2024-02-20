import React, { useContext } from "react";
import "./toggleThemeButton.scss";
import { ThemeContext } from "../../ThemeContext/ThemeContext";

export const ToggleThemeButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={theme === "dark-theme"} onChange={toggleTheme} />
        <span className="slider round" />
      </label>
    </div>
  );
};
