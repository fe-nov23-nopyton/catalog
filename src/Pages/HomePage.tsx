import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchPhones } from "../redux/features/catalogSlice";

import { Loader } from "../Components/Loader";
import { Categories } from "../Components/Categories";
import { Banner } from "../Components/Banner/Banner";

import { getHotPrices } from "../utils/getHotPrices";
import { getNewModels } from "../utils/getNewModels";
import { Recommends } from "../Components/Recommends/Recommends";
import { useTranslation } from "react-i18next";

export const HomePage: React.FC = () => {
  const { phones, tablets, accessories, loading } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const amountItems = {
    amountPhones: phones.length,
    amountTablets: tablets.length,
    amountAccessories: accessories.length
  };

  useEffect(() => {
    if (phones.length !== 0) {
      return;
    }

    dispatch(fetchPhones());

    //use new fetch for count of phones, tablets and accessories
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
          <h1 className="title">{t("homePage.greeter")}</h1>
          <Banner />
          {newModels.length !== 0 && <Recommends products={newModels} title={t("recommends.newModels")} />}
          <Categories amount={amountItems} />
          {hotPrices.length !== 0 && <Recommends products={hotPrices} title={t("recommends.hotPrices")} />}
        </>
      )}
    </>
  );
};
