import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./Pages/HomePage";
import { NotFoundPage } from "./Pages/NotFoundPage/NotFoundPage";
import { PhonesPage } from "./Pages/PhonesPage/PhonesPage";
import { TabletsPage } from "./Pages/TabletsPage";
import { AccessoriesPage } from "./Pages/AccessoriesPage";
import { CartPage } from "./Pages/CartPage";
import { FavoritesPage } from "./Pages/FavouritesPage/FavouritesPage";
import { CardLayout } from "./Components/CardLayout/CardLayout";

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/catalog/*" element={<App />}>
        <Route index element={<Navigate to="home" />} />

        <Route path="home" element={<HomePage />} />

        <Route path="phones/">
          <Route index element={<PhonesPage />} />
          <Route path=":phoneId" element={<CardLayout />} />
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
