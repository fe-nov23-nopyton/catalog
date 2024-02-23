/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import './PhonesPage.scss';
import { ProductsList } from "../../Components/ProductsList/ProductsList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPhones } from "../../redux/features/catalogSlice";
import { Pagination } from "../../Components/Pagination/Pagination";
import { paginateArray } from "../../utils/paginate";

export const PhonesPage: React.FC = () => {
  const { phones } = useAppSelector(state => state.catalog); // use also loading and error states
  const { itemsOnPage } = useAppSelector(state => state.filter)
  const [currentPage, setCurentPage] = useState(1)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhones())
  } ,[]);

  useEffect(() => {
    window.scrollTo(100, 100);
  },[currentPage])

  const phonesOnPage = paginateArray(phones, currentPage, itemsOnPage);

  const onPageChange = (page: number) => {
    setCurentPage(page)
  }

  const quantityPhones = phones.length;

  return (
    <>
      <div>
        <h1 className="title">Mobile phones</h1>
      </div>
      <p className="total-phones">{quantityPhones} models</p>

      <div className="additional-elements">
        <div className="sort-options">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" name="sort">
            <option value="newest">Newest</option>
          </select>
        </div>
        <div className="items-per-page">
          <label htmlFor="items">Items on page:</label>
          <select id="items" name="items">
            <option value="16">16</option>
          </select>
        </div>
      </div>

      <ProductsList phones={phonesOnPage} />

      <Pagination
        total={phones.length}
        perPage={itemsOnPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      </>
    );
  };
