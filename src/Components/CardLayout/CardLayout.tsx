import { useLocation, useNavigate } from "react-router-dom";
import { CardGalery } from "./CardGalery/CardGalery";
import "./CardLayout.scss";
import { CardSpec } from "./CardSpec/CardSpec";
import { Breadcrumbs } from "../Breadcrumbs";
import { useEffect, useState } from "react";
import { SelectedPhone } from "../../types/SelectedPhone";
import { fetchPhoneData } from "../../utils/fetchClient";
import { Button } from "../UI_Kit/Button";
import { ButtonType } from "../../types/ButtonType";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, deleteFromCart } from "../../redux/features/cartSlice";
import { Icon } from "../UI_Kit/Icon";
import { IconContent } from "../../types/IconContent";
import { clickFavorite } from "../../redux/features/favoritesSlice";

// const tempPhone: SelectedPhone = {
//   id: "apple-iphone-11-256gb-green",
//   namespaceId: "apple-iphone-11",
//   name: "Apple iPhone 11 256GB Green",
//   capacityAvailable: ["64GB", "128GB", "256GB"],
//   capacity: "256GB",
//   priceRegular: 1172,
//   priceDiscount: 1115,
//   colorsAvailable: ["black", "green", "yellow", "white", "purple", "red"],
//   color: "green",
//   images: [
//     "/catalog/new/img/phones/apple-iphone-11/green/00.png",
//     "/catalog/new/img/phones/apple-iphone-11/green/01.png",
//     "/catalog/new/img/phones/apple-iphone-11/green/02.png",
//     "/catalog/new/img/phones/apple-iphone-11/green/03.png",
//     "/catalog/new/img/phones/apple-iphone-11/green/04.png"
//   ],
//   description: [
//     {
//       title: "And then there was Pro",
//       text: [
//         "A transformative triple-camera system that adds tons of capability without complexity.",
//         "An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro."
//       ]
//     },
//     {
//       title: "Camera",
//       text: [
//         "Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it."
//       ]
//     },
//     {
//       title: "Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.",
//       text: [
//         "iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with."
//       ]
//     }
//   ],
//   screen: "6.1' IPS",
//   resolution: "1792x828",
//   processor: "Apple A13 Bionic",
//   ram: "4GB",
//   camera: "12 Mp + 12 Mp + 12MP",
//   zoom: "Digital, 5x",
//   cell: ["GPRS", "EDGE", "WCDMA", "UMTS", "HSPA", "LTE"]
// };

export const CardLayout = () => {
  const [phoneData, setPhoneData] = useState<SelectedPhone>({} as SelectedPhone);
  const [currentCapacity, setCurrentCapacity] = useState<string>(phoneData.capacity);
  const [selectedColor, setSelectedColor] = useState<string>(phoneData.color);
  const [loading, setLoading] = useState(true);

  const { pathname } = useLocation();
  const normalizedPath = pathname.split("/")[3];

  const favorites = useAppSelector((state) => state.favorites.favorites);
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

  const hasFavoriteItem = favorites.some((item) => item.id === phoneData.id);
  const hasCartItem = cart.some((item) => item.id === phoneData.id);
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  useEffect(() => {
    window.scrollTo({ top: 85, behavior: "smooth" });
  }, []);

  useEffect(() => {
    fetchPhoneData(normalizedPath, setPhoneData, setLoading, setCurrentCapacity, setSelectedColor);
  }, []);

  const handleToggleCart = () => {
    const phone = {
      id: phoneData.id,
      name: phoneData.name,
      price: phoneData.priceDiscount,
      image: phoneData.images[0]
    };
    const cartItem = {
      id: phoneData.id,
      quantity: 1,
      product: phone
    };

    if (hasCartItem) {
      dispatch(deleteFromCart(cartItem));
    } else {
      dispatch(addToCart(cartItem));
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      localStorage.setItem("cart", JSON.stringify([...cartItems, cartItem]));
    }
  };

  const handleFavorite = () => {
    const phone = {
      id: phoneData.id,
      category: "phones",
      phoneId: phoneData.namespaceId,
      itemId: phoneData.id,
      name: phoneData.name,
      fullPrice: phoneData.priceRegular,
      price: phoneData.priceDiscount,
      screen: phoneData.screen,
      capacity: currentCapacity,
      color: selectedColor,
      ram: phoneData.ram,
      year: 2020, // we do not have this data
      image: phoneData.images[0]
    };
    dispatch(clickFavorite(phone));
  };

  return (
    <>
      {!loading && (
        <>
          <Breadcrumbs path={pathname} />
          <div style={{ textAlign: "left" }}>
            <Button handleClick={handleBack} buttonType={ButtonType.Navigation} buttonText="Back" />
          </div>

          <div className="cardLayout">
            <div className="cardLayout__header">{phoneData.name}</div>
            <div className="cardLayout__pictures">
              <CardGalery images={phoneData.images} />
            </div>
            <div className="cardLayout__options">
              <div className="cardLayout__options-id">ID: {phoneData.id}</div>
              <div className="cardLayout__options-color">
                <div className="cardLayout__options-color-text">Available colors</div>
                <div className="cardLayout__options-color-select">
                  {phoneData.colorsAvailable.map((color) => (
                    <Icon
                      handleClick={() => setSelectedColor(color)}
                      isSelected={selectedColor === color}
                      iconType={IconContent.Color}
                      color={color}
                    />
                  ))}
                </div>
              </div>

              <div className="cardLayout__options-capacity">
                <div className="cardLayout__options-capacity-text">Select capacity</div>
                <div className="cardLayout__options-capacity-select">
                  {phoneData.capacityAvailable.map((capacity) => (
                    <Icon
                      handleClick={() => setCurrentCapacity(capacity)}
                      isSelected={currentCapacity === capacity}
                      iconType={IconContent.Text}
                      content={capacity}
                    />
                  ))}
                </div>
              </div>
              <div className="cardLayout__options-price">
                <div className="cardLayout__options-price-content">
                  <div className="cardLayout__options-price-regular">${phoneData.priceRegular}</div>
                  <div className="cardLayout__options-price-disc">${phoneData.priceDiscount}</div>
                </div>
                <div className="cardLayout__options-price-controls">
                  <Button
                    handleClick={handleToggleCart}
                    isSelected={hasCartItem}
                    buttonType={ButtonType.Primary}
                    buttonText="Add to cart"
                  />
                  <Icon isSelected={hasFavoriteItem} handleClick={handleFavorite} iconType={IconContent.Favorites} />
                </div>
              </div>
              <div className="cardLayout__options-info">
                <CardSpec spec={phoneData} isTrimmed={true} />
              </div>
            </div>
            <div className="cardLayout__specs">
              <div className="cardLayout__specs-title">Tech specs</div>
              <div className="cardLayout__specs-info">
                <CardSpec spec={phoneData} isTrimmed={false} />
              </div>
            </div>
            <div className="cardLayout__about">
              <div className="cardLayout__about-title">About</div>
              <div className="cardLayout__about-content">
                {phoneData.description.map(
                  (content) => (
                    console.log(content.text),
                    (
                      <div className="cardLayout__about-content-main">
                        <div className="cardLayout__about-content-main-title">{content.title}</div>
                        <div className="cardLayout__about-content-main-text">{content.text.map((t) => t)}</div>
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
