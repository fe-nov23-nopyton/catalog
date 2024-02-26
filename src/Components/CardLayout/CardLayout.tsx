/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import { CardGalery } from "./CardGalery/CardGalery";
import "./CardLayout.scss";
import { CardSpec } from "./CardSpec/CardSpec";
import { Breadcrumbs } from "../Breadcrumbs";
import { useEffect } from "react";
import { Button } from "../UI_Kit/Button";
import { ButtonType } from "../../types/ButtonType";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, deleteFromCart } from "../../redux/features/cartSlice";
import { Icon } from "../UI_Kit/Icon";
import { IconContent } from "../../types/IconContent";
import { clickFavorite } from "../../redux/features/favoritesSlice";
import { replacePart } from "../../utils/replacePath";
import { Loader } from "../Loader";
import { selectNewCapacity, selectNewColor, fetchPhone } from "../../redux/features/productDataSlice";

export const CardLayout = () => {
  const { phoneData, color, capacity, loading, errorMessage } = useAppSelector((state) => state.phoneData);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const normalizedPath = pathname.split("/")[3];
  const ramPath = replacePart(normalizedPath, capacity, false);
  const colorPath = replacePart(normalizedPath, color);

  const favorites = useAppSelector((state) => state.favorites.favorites);
  const cart = useAppSelector((state) => state.cart.cart);

  const hasFavoriteItem = favorites.some((item) => item.id === phoneData.id);
  const hasCartItem = cart.some((item) => item.id === phoneData.id);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  useEffect(() => {
    window.scrollTo({ top: 85, behavior: "smooth" });
  }, []);

  useEffect(() => {
    dispatch(fetchPhone(normalizedPath));
  }, []);

  useEffect(() => {
    dispatch(fetchPhone(ramPath));
  }, [capacity]);

  useEffect(() => {
    dispatch(fetchPhone(colorPath));
  }, [color]);

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
      capacity,
      color,
      ram: phoneData.ram,
      year: 2020, // we do not have this data
      image: phoneData.images[0]
    };

    dispatch(clickFavorite(phone));
  };

  return (
    <>
      {!loading ? (
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
                  {phoneData.colorsAvailable.map((availableColor) => (
                    <Icon
                      handleClick={() => dispatch(selectNewColor(availableColor))}
                      isSelected={availableColor === color}
                      iconType={IconContent.Color}
                      color={availableColor}
                    />
                  ))}
                </div>
              </div>

              <div className="cardLayout__options-capacity">
                <div className="cardLayout__options-capacity-text">Select capacity</div>
                <div className="cardLayout__options-capacity-select">
                  {phoneData.capacityAvailable.map((availableCapacity) => (
                    <Icon
                      handleClick={() => dispatch(selectNewCapacity(availableCapacity))}
                      isSelected={availableCapacity === capacity}
                      iconType={IconContent.Text}
                      content={availableCapacity}
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
                {phoneData.description.map((content) => (
                  <div className="cardLayout__about-content-main">
                    <div className="cardLayout__about-content-main-title">{content.title}</div>
                    <div className="cardLayout__about-content-main-text">{content.text.map((t) => t)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
