import React, { useState } from "react";
import classNames from "classnames";

import "./CardGalery.scss";
import { changeImageFormat } from "../../../utils/changeImageFormat";

interface GaleryProps {
  images: string[];
}

export const CardGalery: React.FC<GaleryProps> = React.memo(({ images }) => {
  const [img, setImg] = useState(images[0]);

  return (
    <div className="card__galery">
      <div className="card__galery-main">
        <img className="card__galery-main-img" src={`/catalog/new/${changeImageFormat(img)}`} alt="1" />
      </div>

      <div className="card__galery-sidebar">
        {images?.map((item) => (
          <img
            key={item}
            src={`/catalog/new/${changeImageFormat(item)}`}
            onClick={() => setImg(item)}
            className={classNames("card__galery-sidebar-item", { "active__galery-card": item === img })}
          />
        ))}
      </div>
    </div>
  );
});
