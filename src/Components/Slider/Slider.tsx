/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { Phone } from "../../types/Phone";
import "./Slider.scss";
import { Icon } from "../UI_Kit/Icon";
import { IconContent } from "../../types/IconContent";

interface SliderProps {
  title: string;
  phones: Phone[];
}

export const Slider: React.FC<SliderProps> = ({ title, phones }) => {
  const [currentPhoneIndex, setCurrentPhoneIndex] = useState(0);
  const [backDisabled, setBackDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Ref for tracking touch events
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [currentPhoneIndex]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const touchEndX = event.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX.current;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }

    touchStartX.current = null;
  };

  const prevSlide = () => {
    if (currentPhoneIndex === 0) {
      setBackDisabled(true);
      return;
    }
    setCurrentPhoneIndex((prevIndex) => (prevIndex === 0 ? phones.length - 1 : prevIndex - 1));
    setAnimationKey((prevKey) => prevKey + 1);
    setNextDisabled(false);
  };

  const nextSlide = () => {
    if (currentPhoneIndex === phones.length - 1) {
      setNextDisabled(true);
      return;
    }
    setCurrentPhoneIndex((prevIndex) => (prevIndex === phones.length - 1 ? 0 : prevIndex + 1));
    setAnimationKey((prevKey) => prevKey + 1);
    setBackDisabled(false);
  };

  return (
    <>
      <div className="wrapper">
        <h2 className="title-slider">{title}</h2>
        <div className="sliderButtons">
          <div className="sliderIcon-reverse">
            <Icon iconType={IconContent.Arrow} handleClick={prevSlide} isDisabled={backDisabled} />
          </div>

          <div>
            <Icon iconType={IconContent.Arrow} handleClick={nextSlide} isDisabled={nextDisabled} />
          </div>
        </div>
      </div>
      <div
        className="slider sliderWrapper"
        key={animationKey}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <ProductCard phone={phones[currentPhoneIndex % phones.length]} />
        <ProductCard phone={phones[(currentPhoneIndex + 1) % phones.length]} />
        <ProductCard phone={phones[(currentPhoneIndex + 2) % phones.length]} />
        <ProductCard phone={phones[(currentPhoneIndex + 3) % phones.length]} />
      </div>
    </>
  );
};
