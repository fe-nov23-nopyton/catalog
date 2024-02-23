/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Slider } from "../Components/Slider";
import { fetchPhones } from "../redux/features/catalogSlice";
import { Loader } from "../Components/Loader";
import { Categories } from "../Components/Categories";
import { getHotPrices } from "../utils/getHotPrices";
import { getNewModels } from "../utils/getNewModels";
import Swiper from "../Components/Slider/Swiper";
import { response } from "express";

export const HomePage: React.FC = () => {
  const { phones, loading } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const amountItems = { amountPhones: phones.length, amountTablets: 0, amountAccessories: 0 };

  useEffect(() => {
    dispatch(fetchPhones());
  }, []);

  const hotPrices = getHotPrices(phones);
  const newModels = [...phones].sort();

  // const banners = [
  //   "../public/new/img/phones/banner-phones.png",
  //   "../public/new/img/phones/banner-tablets.png",
  //   "../public/new/img/phones/banner-accessories.png"
  // ];

  return (
    <>
      <h1 className="title">Home Page</h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          {newModels.length !== 0 && <Slider title={"Brand new models"} phones={newModels} />}
          <Categories amount={amountItems} />
          {hotPrices.length !== 0 && <Slider title={"Hot prices"} phones={hotPrices} />}
        </>
      )}
    </>
  );
};
