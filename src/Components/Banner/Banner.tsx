import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "./Banner.scss";

export const Banner = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<span class="${className} swiper_bullet" style="background-color: white;"></span>`;
    }
  };

  return (
    <div className="banner">
      <Swiper
        spaceBetween={30}
        pagination={pagination}
        loop
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
      >
        {[1, 2, 3].map((slideIndex) => (
          <SwiperSlide key={slideIndex} className="banner__slide">
            <img className="banner__photo" src="../../images/banner.png" alt={`Banner ${slideIndex}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
