import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CardGalery } from "./CardGalery/CardGalery";
import { CardSpec } from "./CardSpec/CardSpec";
import { Breadcrumbs } from "../Breadcrumbs";
import { Button } from "../UI_Kit/Button";
import { Icon } from "../UI_Kit/Icon";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart, deleteFromCart } from "../../redux/features/cartSlice";
import { clickFavorite } from "../../redux/features/favoritesSlice";
import { fetchProduct } from "../../redux/features/productDataSlice";
import { fetchAccessories, fetchPhones, fetchTablets } from "../../redux/features/catalogSlice";

import { ButtonType } from "../../types/ButtonType";
import { IconContent } from "../../types/IconContent";
import { Recommends } from "../Recommends/Recommends";

import { replacePart } from "../../utils/replacePath";
import { getRecommendModels } from "../../utils/getRecommendModels";

import "./CardLayout.scss";
import { TempCardLayout } from "../TempCard/TempCardLayout";
import { useTranslation } from "react-i18next";
import { getCategoryNameById } from "../../utils/getCategoryNameById";
import { normalizedColorName } from "../../utils/normalizedColorName";

export const CardLayout = () => {
  const { t } = useTranslation();
  // #region Fetching phone data
  const { productData, loading: loadingData } = useAppSelector((state) => state.productData);
  const dispatch = useAppDispatch();

  let description = [];

  if (!!productData.id) {
    description = JSON.parse(productData.description);
  }

  const { pathname } = useLocation();
  const normalizedPath = pathname.split("/")[3];
  const currentCategory = productData.categoryId;

  useEffect(() => {
    dispatch(fetchProduct(normalizedPath));
  }, [pathname]);

  const handleAttributeChange = (attribute: string, isColor = true) => {
    const path = replacePart(normalizedPath, attribute.toLowerCase(), isColor);

    navigate(`/catalog/${getCategoryNameById(currentCategory)}/${path}`);
  };

  const handleColor = (color: string) => handleAttributeChange(color);
  const handleCapacity = (capacity: string) => handleAttributeChange(capacity, false);
  // #endregion

  // #region States favorite and cart
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const cart = useAppSelector((state) => state.cart.cart);

  const hasFavoriteItem = favorites.some((item) => item.id === productData.id);
  const hasCartItem = cart.some((item) => item.id === productData.id);
  // #endregion

  // #region Navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productData]);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  // #endregion

  // #region Selecting product
  const handleToggleCart = () => {
    const phone = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      image: productData.images[0]
    };

    const cartItem = {
      id: productData.id,
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
      id: productData.id,
      categoryId: productData.categoryId,
      phoneId: productData.itemId,
      itemId: productData.id,
      name: productData.name,
      fullPrice: productData.fullPrice,
      price: productData.price,
      screen: productData.screen,
      capacity: productData.capacity,
      color: productData.color,
      ram: productData.ram,
      year: productData.year,
      images: [productData.images[0]]
    };

    dispatch(clickFavorite(phone));
  };
  // #endregion

  // #region Slider
  useEffect(() => {
    switch (getCategoryNameById(currentCategory)) {
      case "phones":
        if (phones.length !== 0) {
          return;
        }

        dispatch(fetchPhones());
        break;
      case "tablets":
        if (tablets.length !== 0) {
          return;
        }

        dispatch(fetchTablets());
        break;
      case "accessories":
        if (accessories.length !== 0) {
          return;
        }

        dispatch(fetchAccessories());
        break;
      default:
        return;
    }
  }, []);

  const { phones, tablets, accessories, loading } = useAppSelector((state) => state.catalog);
  let products;

  switch (getCategoryNameById(currentCategory)) {
    case "phones":
      products = phones;
      break;
    case "tablets":
      products = tablets;
      break;
    case "accessories":
      products = accessories;
      break;
    default:
      products = phones;
  }

  const productsToSlider = getRecommendModels(products, 16);

  // #endregion
  const loaded = !loadingData && !loading;
  return (
    <>
      {loaded && Object.keys(productData).length > 0 ? (
        <>
          <Breadcrumbs path={pathname} />
          <div style={{ textAlign: "left", margin: "40px 0 0 0" }}>
            <Button handleClick={handleBack} buttonType={ButtonType.Navigation} buttonText={t("navigate.back")} />
          </div>
          <div className="cardLayout">
            <div className="cardLayout__header">{productData.name}</div>
            <div className="cardLayout__pictures">
              <CardGalery images={productData.images} />
            </div>
            <div className="cardLayout__options">
              <div className="cardLayout__options-id">ID: {productData.itemId}</div>
              <div className="cardLayout__options-color">
                <div className="cardLayout__options-color-text">{t("product.availableColors")}</div>
                <div className="cardLayout__options-color-select">
                  {productData.colorsAvailable.map((availableColor) => (
                    <Icon
                      key={availableColor}
                      handleClick={() => handleColor(normalizedColorName(availableColor))}
                      isSelected={availableColor === productData.color}
                      iconType={IconContent.Color}
                      color={availableColor}
                    />
                  ))}
                </div>
              </div>
              <div className="cardLayout__options-capacity">
                <div className="cardLayout__options-capacity-text">{t("product.selectCapacity")}</div>

                <div className="cardLayout__options-capacity-select">
                  {productData.capacityAvailable.map((availableCapacity) => (
                    <Icon
                      key={availableCapacity}
                      handleClick={() => handleCapacity(availableCapacity)}
                      isSelected={availableCapacity === productData.capacity}
                      iconType={IconContent.Text}
                      content={availableCapacity}
                    />
                  ))}
                </div>
              </div>
              <div className="cardLayout__options-price">
                <div className="cardLayout__options-price-content">
                  <div className="cardLayout__options-price-regular">${productData.fullPrice}</div>
                  <div className="cardLayout__options-price-disc">${productData.price}</div>
                </div>
                <div className="cardLayout__options-price-controls">
                  <Button
                    handleClick={handleToggleCart}
                    isSelected={hasCartItem}
                    buttonType={ButtonType.Primary}
                    buttonText={t("button.addToCart")}
                  />
                  <Icon isSelected={hasFavoriteItem} handleClick={handleFavorite} iconType={IconContent.Favorites} />
                </div>
              </div>
              <div className="cardLayout__options-info">
                <CardSpec spec={productData} isTrimmed={true} />
              </div>
            </div>
            <div className="cardLayout__specs">
              <div className="cardLayout__specs-title">{t("product.techSpecs")}</div>
              <div className="cardLayout__specs-info">
                <CardSpec spec={productData} isTrimmed={false} />
              </div>
            </div>
            <div className="cardLayout__about">
              <div className="cardLayout__about-title">{t("product.about")}</div>
              <div className="cardLayout__about-content">
                {description.map((item: { title: string; text: string }) => (
                  <div className="cardLayout__about-content-main">
                    <div className="cardLayout__about-content-main-title">{item.title}</div>
                    <div className="cardLayout__about-content-main-text">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Recommends title={t("recommends.mayLike")} products={productsToSlider} />
        </>
      ) : (
        <TempCardLayout />
      )}
    </>
  );
};
