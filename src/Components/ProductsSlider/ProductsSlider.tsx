import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { Phone } from "../../types/Phone";
import useWindowDimensions from "../../hooks/ScreenWidth";
import { ScreenWidth } from "../../types/ScreenWidth";
import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";

import "./ProductsSlider.scss";

interface Props {
  items: Phone[];
}

export const ProductsSlider: React.FC<Props> = ({ items }) => {
  const [slidesPerView, setSlidesPerView] = useState(2);

  const screenWidth = useWindowDimensions().width || 320;
  useEffect(() => {
    if (screenWidth > ScreenWidth.Desktop) {
      setSlidesPerView(4);
    } else if (screenWidth > ScreenWidth.Tablet) {
      setSlidesPerView(3);
    } else if (screenWidth > ScreenWidth.LargePhone) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }

    console.log("render screen", slidesPerView);
  }, [screenWidth]);

  return (
    <div className="productsSwiper">
      <Swiper
        loop
        centeredSlides
        slidesPerView={2}
        spaceBetween={16}
        width={600}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard phone={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
