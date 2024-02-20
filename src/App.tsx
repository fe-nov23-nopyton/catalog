import "./App.scss";
import { Header } from "./header/Header";
import { RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "./redux/themeSlice";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer/Footer";

export function App() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  function toggleTheme() {
    if (theme === "dark-theme") {
      dispatch(changeTheme("light-theme"));
    } else {
      dispatch(changeTheme("dark-theme"));
    }
  }

  return (
    <>
      <div className={`App ${theme} App-wrapper`}>
        <Header />
        <button onClick={toggleTheme}>theme</button>

        <Outlet />

        <Footer theme={theme} />
      </div>
    </>
  );
}
