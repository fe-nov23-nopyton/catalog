/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

export type ContextProvider = {
  children: React.ReactNode;
};

interface Context {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  toggleTheme: () => void;
}

const intitialValue: Context = {
  theme: "light-theme",
  setTheme: () => {},
  toggleTheme: () => {}
};

const ThemeContext = createContext<Context>(intitialValue);

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    localStorage.setItem("theme", "light-theme");
    return "light-theme";
  } else {
    return theme;
  }
};

const ThemeProvider: React.FC<ContextProvider> = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  function toggleTheme() {
    if (theme === "dark-theme") {
      setTheme("light-theme");
    } else {
      setTheme("dark-theme");
    }
  }

  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem("theme", theme);
    };

    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
