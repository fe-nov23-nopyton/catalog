/* eslint-disable prettier/prettier */
import React from "react";
import './PhonesPage.scss';
import { ProductsList } from "../../Components/ProductsList/ProductsList";
import { Phone } from "../../types/Phone";

const phones: Phone[] = [
  {
    id: 1,
    name: "Apple iPhone Xs 64GB Silver (iMT9G2FS/A)",
    price: "$699",
    image: 'https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194',
    screen: "6.1-inch",
    capacity: "64GB, 128GB, 256GB",
    ram: "4GB",
  },
  {
    id: 2,
    name: "Apple iPhone Xs 64GB Silver (iMT9G2FS/A)",
    price: "$699",
    image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
    screen: "6.1-inch",
    capacity: "64GB, 128GB, 256GB",
    ram: "4GB",
  },
  {
    id: 3,
    name: "Apple iPhone Xs 64GB Silver (iMT9G2FS/A)",
    price: "$699",
    image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
    screen: "6.1-inch",
    capacity: "64GB, 128GB, 256GB",
    ram: "4GB",
  },
  {
    id: 4,
    name: "Apple iPhone Xs 64GB Silver (iMT9G2FS/A)",
    price: "$699",
    image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
    screen: "6.1-inch",
    capacity: "64GB, 128GB, 256GB",
    ram: "4GB",
  },
  {
    id: 5,
    name: "Apple iPhone Xs 64GB Silver (iMT9G2FS/A)",
    price: "$699",
    image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
    screen: "6.1-inch",
    capacity: "64GB, 128GB, 256GB",
    ram: "4GB",
  },
  {
    id: 6,
    name: "Apple iPhone Xs 64GB Silver (iMT9G2FS/A)",
    price: "$699",
    image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
    screen: "6.1-inch",
    capacity: "64GB, 128GB, 256GB",
    ram: "4GB",
  },
  {
    id: 7,
    name: "iPhone 12",
    price: "$699",
    image: "https://shoptopnotch.ca/cdn/shop/files/apple_iphone_xr_front.png?v=1704285194",
    screen: "6.1-inch",
    capacity: "64GB, 128GB, 256GB",
    ram: "4GB",
  },
]; // This is a mock data

export const PhonesPage: React.FC = () => {
  console.log("PhonesPage");

  const quantityPhones = phones.length;

  return (
    <>
      <div>
        <h1 className="title">Mobile phones</h1>
      </div>

      <div className="additional-elements">
        <p>{quantityPhones} models</p>

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
