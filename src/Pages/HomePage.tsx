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
import { Banner } from "../Components/Banner/Banner";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ProductCard } from "../Components/ProductCard/ProductCard";
import useWindowDimensions from "../hooks/ScreenWidth";
import { ProductsSlider } from "../Components/ProductsSlider/ProductsSlider";

export const HomePage: React.FC = () => {
  const { phones, loading } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const screen = useWindowDimensions();
  console.log(screen);

  const amountItems = { amountPhones: phones.length, amountTablets: 0, amountAccessories: 0 };

  useEffect(() => {
    dispatch(fetchPhones());
  }, [dispatch]);

  const hotPrices = getHotPrices(phones);
  const newModels = getNewModels(phones);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className} swiper_bullet" style="background-color: white;"></span>`;
    },
    dynamicBullets: true
  };

  return (
    <>
      <h1 className="title">Welcome to Nice Gadgets store!</h1>

      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <Banner /> */}
          <ProductsSlider items={newModels} />
          {/* <Categories amount={amountItems} /> */}
          {/* {hotPrices.length !== 0 && <Slider title={"Hot prices"} phones={hotPrices} />} */}
        </>
      )}
    </>
  );
};
