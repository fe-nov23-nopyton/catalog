import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./Pages/HomePage";
import { NotFoundPage } from "./Pages/NotFoundPage/NotFoundPage";
import { Products } from "./Pages/PhonesPage/Products";
import { TabletsPage } from "./Pages/TabletsPage";
import { AccessoriesPage } from "./Pages/AccessoriesPage";
import { CartPage } from "./Pages/CartPage";
import { FavoritesPage } from "./Pages/FavouritesPage/FavouritesPage";
import { CardLayout } from "./Components/CardLayout/CardLayout";
import { Contacts } from "./Pages/Contacts/Contacts";

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/catalog/*" element={<App />}>
        <Route index element={<Navigate to="home" />} />

        <Route path="home" element={<HomePage />} />

        <Route path=":category">
          <Route index element={<Products />} />
          <Route path=":productId" element={<CardLayout />} />
          <Route path=":page" element={<Products />} />
        </Route>

        <Route path="favorites">
          <Route index element={<FavoritesPage />} />
        </Route>

        <Route path="cart">
          <Route index element={<CartPage />} />
        </Route>

        <Route path="contacts">
          <Route index element={<Contacts />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
