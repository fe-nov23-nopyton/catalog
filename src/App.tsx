import React from "react";
import "./App.css";
import { Header } from "./header/Header";
import { RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "./redux/themeSlice";

function App() {
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
      <div className={`App ${theme}`}>
        <Header />
        <button onClick={toggleTheme}>theme</button>
      </div>
    </>
  );
}

export default App;
