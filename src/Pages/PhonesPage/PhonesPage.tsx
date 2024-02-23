/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import "./PhonesPage.scss";
import { ProductsList } from "../../Components/ProductsList/ProductsList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPhones } from "../../redux/features/catalogSlice";
import { Dropdown } from "../../Components/Dropdown";
import { sortItems } from "../../utils/sortItems";
import { Phone } from "../../types/Phone";
import { Breadcrumbs } from "../../Components/Breadcrumbs";
import { CardLayout } from "../../Components/CardLayout/CardLayout";
import { useLocation } from "react-router-dom";

export const PhonesPage: React.FC = () => {
  const { phones } = useAppSelector((state) => state.catalog); // use also loading and error states
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const [sort, setSort] = useState("Cheapest");
  const optionsForSort = ["Cheapest", "Alphabetically", "Newest"];

  const [itemsOnPage, setItemsOnPage] = useState("All");
  const optionsForItemsOnPage = ["All", "4", "8", "16"];

  console.log(phones);
  console.log(sort);
  console.log(itemsOnPage);

  const prepareProducts = (phones: Phone[], sortBy: string, changeVisible: string) => {
    const sortedPhones = sortItems(phones, sortBy);
    return changeVisible === "All" ? sortedPhones : sortedPhones.slice(0, +changeVisible);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  const handleItemsOnPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsOnPage(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchPhones());
  }, []);

  const quantityPhones = phones.length;

  return (
    <>
      <Breadcrumbs path={pathname} />
      {!false ? (
        <>
          <div>
            <h1 className="title">Mobile phones</h1>
          </div>
          <p className="total-phones">{quantityPhones} models</p>

          <div className="dropdown-wrapper">
            <Dropdown handleChange={handleSortChange} title={"Sort by"} options={optionsForSort} />
            <Dropdown handleChange={handleItemsOnPageChange} title={"Items on page"} options={optionsForItemsOnPage} />
          </div>

          <ProductsList phones={prepareProducts(phones, sort, itemsOnPage)} />
        </>
      ) : (
        <CardLayout />
      )}
    </>
  );
};
