import { useState } from "react";
import "./CardGalery.scss";
import classNames from "classnames";

interface GaleryProps {
  images: string[];
}

export const CardGalery: React.FC<GaleryProps> = ({ images }) => {
  const [img, setImg] = useState(images[0]);
  const pngImg = img.replace(".jpg", ".png");

  return (
    <div className="card__galery">
      <div className="card__galery-main">
        <img className="card__galery-main-img" src={`${pngImg}`} alt="1" />
      </div>
      <div className="card__galery-sidebar">
        {images.map((item) => {
          const pngImg = item.replace(".jpg", ".png");
          return (
            <img
              key={item}
              src={`${pngImg}`}
              onClick={() => setImg(item)}
              className={classNames("card__galery-sidebar-item", { "active__galery-card": item === img })}
            />
          );
        })}
      </div>
    </div>
  );
};
