import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Root } from "./Root";
import { ThemeProvider } from "./ThemeContext/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <Root />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
