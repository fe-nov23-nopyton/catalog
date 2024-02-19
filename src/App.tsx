import { useContext } from "react";
import "./App.scss";
import { Header } from "./header/Header";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "./ThemeContext/ThemeContext";

export function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`App ${theme}`}>
        <Header />
        <Outlet />
      </div>
    </>
  );
}
