/* eslint-disable @typescript-eslint/no-empty-function */
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard/ProductCard";

import "./Recommends.scss";
import "../Slider/Slider.scss";
import React from "react";

interface Props {
  products: Product[];
  title: string;
}

export const Recommends: React.FC<Props> = ({ products, title }) => (
  <>
    <div className="recommends__wrapper">
      <h2 className="title-slider">{title}</h2>
    </div>
    <div className="recommends">
      <Swiper
        loop
        slidesPerView={4}
        modules={[Autoplay, Navigation]}
        spaceBetween={16}
        initialSlide={2}
        navigation
        autoplay={{
          delay: 2500
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 3
          },
          1200: {
            slidesPerView: 4
          }
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={`${product.id}-${index}`}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </>
);
