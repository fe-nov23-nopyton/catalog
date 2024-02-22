/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { Phone } from "../../types/Phone";
import "./Slider.css";

interface SliderProps {
  title: string;
  phones: Phone[];
}

export const Slider: React.FC<SliderProps> = ({ title, phones }) => {
  const [currentPhoneIndex, setCurrentPhoneIndex] = useState(0);
  const [backDisabled, setBackDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [currentPhoneIndex]);

  const prevSlide = () => {
    if (currentPhoneIndex === 0) {
      setBackDisabled(true);
      return;
    }
    setCurrentPhoneIndex((prevIndex) => (prevIndex === 0 ? phones.length - 1 : prevIndex - 1));
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const nextSlide = () => {
    if (currentPhoneIndex === phones.length - 1) {
      setNextDisabled(true);
      return;
    }
    setCurrentPhoneIndex((prevIndex) => (prevIndex === phones.length - 1 ? 0 : prevIndex + 1));
    setAnimationKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <div className="wrapper">
        <h2 className="title-slider">{title}</h2>
        <div className="sliderButtons">
          <button onClick={prevSlide}>Previous</button>
          <button onClick={nextSlide}>Next</button>
        </div>
      </div>
      <div className="slider sliderWrapper" key={animationKey}>
        <ProductCard phone={phones[currentPhoneIndex % phones.length]} />
        <ProductCard phone={phones[(currentPhoneIndex + 1) % phones.length]} />
        <ProductCard phone={phones[(currentPhoneIndex + 2) % phones.length]} />
        <ProductCard phone={phones[(currentPhoneIndex + 3) % phones.length]} />
      </div>
    </>
  );
};
