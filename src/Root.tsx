import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./Pages/HomePage";
import { NotFoundPage } from "./Pages/NotFoundPage";
import { PhonesPage } from "./Pages/PhonesPage/PhonesPage";
import { TabletsPage } from "./Pages/TabletsPage";
import { AccessoriesPage } from "./Pages/AccessoriesPage";
import { CartPage } from "./Pages/CartPage";
import { FavoritesPage } from "./Pages/FavouritesPage/FavouritesPage";

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/catalog/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/catalog/" />} />

        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":phoneId" element={<PhonesPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":tabletId" element={<TabletsPage />} />
        </Route>

        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":accessoryId" element={<AccessoriesPage />} />
        </Route>

        <Route path="favorites">
          <Route index element={<FavoritesPage />} />
        </Route>

        <Route path="cart">
          <Route index element={<CartPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
