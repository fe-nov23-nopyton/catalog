/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import './PhonesPage.scss';
import { ProductsList } from "../../Components/ProductsList/ProductsList";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPhones } from "../../redux/features/catalogSlice";

export const PhonesPage: React.FC = () => {
  const { phones } = useAppSelector(state => state.catalog); // use also loading and error states
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhones())
  } ,[]);

  const quantityPhones = phones.length;

  return (
    <>
      <div>
        <h1 className="title">Mobile phones</h1>
      </div>

      <div className="additional-elements">
        <p className="total-phones">{quantityPhones} models</p>

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

      <ProductsList phones={phones} />
      </>
    );
  };
