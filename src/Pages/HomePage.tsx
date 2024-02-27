/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Slider } from "../Components/Slider";
import { fetchPhones } from "../redux/features/catalogSlice";
import { Loader } from "../Components/Loader";
import { Categories } from "../Components/Categories";
import { getHotPrices } from "../utils/getHotPrices";
import { getNewModels } from "../utils/getNewModels";
import Swiper from "../Components/Slider/Swiper";
import { response } from "express";
import { sortItems } from "../utils/sortItems";
import { Phone } from "../types/Phone";
import { Banner } from "../Components/Banner/Banner";

export const HomePage: React.FC = () => {
  const { phones, loading } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const amountItems = { amountPhones: phones.length, amountTablets: 0, amountAccessories: 0 };

  useEffect(() => {
    dispatch(fetchPhones());
  }, [dispatch]);

  const hotPrices = getHotPrices(phones);
  const newModels = getNewModels(phones);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="title">Welcome to Nice Gadgets store!</h1>
          <Banner />
          {newModels.length !== 0 && <Slider title={"Brand new models"} phones={newModels} />}
          <Categories amount={amountItems} />
          {hotPrices.length !== 0 && <Slider title={"Hot prices"} phones={hotPrices} />}
        </>
      )}
    </>
  );
};
