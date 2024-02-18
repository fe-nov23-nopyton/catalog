import "./App.scss";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="App">
      {/* NavBar component */}
      <Outlet />
    </div>
  );
}
