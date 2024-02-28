import "../TempCard/TempCardGalery.scss";

export const TempCardGalery = () => (
  <div className="skeleton__card__galery">
    <div className="skeleton__card__galery-main">
      <div className="skeleton__card__galery-main-img skeleton__bg" />
    </div>

    <div className="skeleton__card__galery-sidebar">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="skeleton__card__galery-sidebar-item skeleton__bg" />
      ))}
    </div>
  </div>
);
