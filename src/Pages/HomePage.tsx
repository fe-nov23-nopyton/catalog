import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchPhones } from "../redux/features/catalogSlice";

import { Slider } from "../Components/Slider";
import { Loader } from "../Components/Loader";
import { Categories } from "../Components/Categories";
import { Banner } from "../Components/Banner/Banner";

import { getHotPrices } from "../utils/getHotPrices";
import { getNewModels } from "../utils/getNewModels";

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
        <div className="position-center">
          <Loader />
        </div>
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
