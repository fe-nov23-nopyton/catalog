import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CardGalery } from "./CardGalery/CardGalery";
import { CardSpec } from "./CardSpec/CardSpec";
import { Breadcrumbs } from "../Breadcrumbs";
import { Button } from "../UI_Kit/Button";
import { Icon } from "../UI_Kit/Icon";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, deleteFromCart } from "../../redux/features/cartSlice";
import { clickFavorite } from "../../redux/features/favoritesSlice";
import { fetchPhone } from "../../redux/features/productDataSlice";
import { fetchPhones } from "../../redux/features/catalogSlice";

import { ButtonType } from "../../types/ButtonType";
import { IconContent } from "../../types/IconContent";
import { Recommends } from "../Recommends/Recommends";

import { replacePart } from "../../utils/replacePath";
import { getRecommendModels } from "../../utils/getRecommendModels";
import { generateRandomId } from "../../utils/generateRandomId";

import "./CardLayout.scss";
import { TempCardLayout } from "../TempCard/TempCardLayout";

export const CardLayout = () => {
  // #region Fetching phone data
  const { phoneData, loading } = useAppSelector((state) => state.phoneData);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();
  const normalizedPath = pathname.split("/")[3];

  useEffect(() => {
    dispatch(fetchPhones()).then(() => {
      dispatch(fetchPhone(normalizedPath));
    });
  }, [pathname]);

  const handleAttributeChange = (attribute: string, isColor = true) => {
    const path = replacePart(normalizedPath, attribute.toLowerCase(), isColor);
    navigate(`/catalog/phones/${path}`);
  };

  const handleColor = (color: string) => handleAttributeChange(color);
  const handleCapacity = (capacity: string) => handleAttributeChange(capacity, false);
  // #endregion

  // #region States favorite and cart
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const cart = useAppSelector((state) => state.cart.cart);

  const hasFavoriteItem = favorites.some((item) => item.id === phoneData.id);
  const hasCartItem = cart.some((item) => item.id === phoneData.id);

  // #endregion

  // #region Navigation
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  // #endregion

  // #region Selecting product
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
      capacity: phoneData.capacity,
      color: phoneData.color,
      ram: phoneData.ram,
      year: 2020,
      image: phoneData.images[0]
    };

    dispatch(clickFavorite(phone));
  };

  // #endregion

  // #region Slider

  // useEffect(() => {
  //   dispatch(fetchPhones());
  // }, []);

  const phones = useAppSelector((state) => state.catalog.phones);
  console.log(phones, "from slider");

  const phonesToSlider = useMemo(() => getRecommendModels(phones, 16), [phones]);
  // #endregion

  const loaded = !loading;
  return (
    <>
      {loaded && phones && Object.keys(phoneData).length > 0 ? (
        <>
          <Breadcrumbs path={pathname} />
          <div style={{ textAlign: "left", margin: "40px 0 0 0" }}>
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
                      key={availableColor}
                      handleClick={() => handleColor(availableColor)}
                      isSelected={availableColor === phoneData.color}
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
                      key={availableCapacity}
                      handleClick={() => handleCapacity(availableCapacity)}
                      isSelected={availableCapacity === phoneData.capacity}
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
                  <div key={generateRandomId()} className="cardLayout__about-content-main">
                    <div className="cardLayout__about-content-main-title">{content.title}</div>
                    <div className="cardLayout__about-content-main-text">
                      {content.text.map((paragraph) => paragraph)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Recommends title="You may also like" phones={phonesToSlider} />
        </>
      ) : (
        <TempCardLayout />
      )}
    </>
  );
};
