import { useContext } from "react";
import "./App.scss";
import { Header } from "./header/Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer";
import { ThemeContext } from "./ThemeContext/ThemeContext";

export function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`App ${theme} App-wrapper`}>
        <Header />

        <div className="main-wrapper">
          <div className="content">
            <Outlet />
          </div>
        </div>

        <Footer theme={theme} />
      </div>
    </>
  );
}
