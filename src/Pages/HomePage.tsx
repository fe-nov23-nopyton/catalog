/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Slider } from "../Components/Slider";
import { fetchPhones } from "../redux/features/catalogSlice";
import { Loader } from "../Components/Loader";

export const HomePage: React.FC = () => {
  const { phones, loading } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  console.log(loading);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(fetchPhones());
  //   }, 500);
  // }, []);

  // useEffect(() => {
  //   dispatch(fetchPhones());
  // }, []);

  console.log(phones);

  return (
    <>
      <h1 className="title">Home Page</h1>

      {loading && <Loader />}

      {!!phones && !loading ? <Slider title={"Hot prices"} phones={phones} /> : null}
    </>
  );
};
