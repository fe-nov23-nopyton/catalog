/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation } from "react-router-dom";
import { CardGalery } from "./CardGalery/CardGalery";
import "./CardLayout.scss";
import { CardSpec } from "./CardSpec/CardSpec";
import { PhoneFull } from "./PhoneFull";
import { PhoneShort } from "./PhoneShort";
import { Breadcrumbs } from "../Breadcrumbs";
import { useEffect } from "react";
const tempPhone: PhoneFull = {
  id: "apple-iphone-11-256gb-green",
  namespaceId: "apple-iphone-11",
  name: "Apple iPhone 11 256GB Green",
  capacityAvailable: ["64GB", "128GB", "256GB"],
  capacity: "256GB",
  priceRegular: 1172,
  priceDiscount: 1115,
  colorsAvailable: ["black", "green", "yellow", "white", "purple", "red"],
  color: "green",
  images: [
    "/catalog/new/img/phones/apple-iphone-11/green/00.png",
    "/catalog/new/img/phones/apple-iphone-11/green/01.png",
    "/catalog/new/img/phones/apple-iphone-11/green/02.png",
    "/catalog/new/img/phones/apple-iphone-11/green/03.png",
    "/catalog/new/img/phones/apple-iphone-11/green/04.png"
  ],
  description: [
    {
      title: "And then there was Pro",
      text: [
        "A transformative triple-camera system that adds tons of capability without complexity.",
        "An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro."
      ]
    },
    {
      title: "Camera",
      text: [
        "Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it."
      ]
    },
    {
      title: "Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.",
      text: [
        "iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with."
      ]
    }
  ],
  screen: "6.1' IPS",
  resolution: "1792x828",
  processor: "Apple A13 Bionic",
  ram: "4GB",
  camera: "12 Mp + 12 Mp + 12MP",
  zoom: "Digital, 5x",
  cell: ["GPRS", "EDGE", "WCDMA", "UMTS", "HSPA", "LTE"]
};

const tempShortPhone: PhoneShort = {
  id: "1",
  category: "phones",
  phoneId: "apple-iphone-7-32gb-black",
  itemId: "apple-iphone-7-32gb-black",
  name: "Apple iPhone 7 32GB Black",
  fullPrice: 400,
  price: 375,
  screen: "4.7' IPS",
  capacity: "32GB",
  color: "black",
  ram: "2GB",
  year: 2016,
  image: "new/img/phones/apple-iphone-7/00.png"
};

export const CardLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 85, behavior: "smooth" });
  }, []);

  return (
    <>
      <Breadcrumbs path={pathname} />

      <div className="cardLayout">
        <div className="cardLayout__header">{tempPhone.name}</div>
        <div className="cardLayout__pictures">
          <CardGalery images={tempPhone.images} />
        </div>
        <div className="cardLayout__options">
          <div className="cardLayout__options-id">ID: 802390</div>
          <div className="cardLayout__options-color">
            <div className="cardLayout__options-color-text">Avalible colors</div>
            <div className="cardLayout__options-color-select">
              {tempPhone.colorsAvailable.map((color) => (
                <div className="cardLayout__options-color-item">{color}</div>
              ))}
            </div>
          </div>

          <div className="cardLayout__options-capacity">
            <div className="cardLayout__options-capacity-text">Select capacity</div>
            <div className="cardLayout__options-capacity-select">
              {tempPhone.capacityAvailable.map((capacity) => (
                <div className="cardLayout__options-capacity-select-item">{capacity}</div>
              ))}
            </div>
          </div>
          <div className="cardLayout__options-price">
            <div className="cardLayout__options-price-content">
              <div className="cardLayout__options-price-regular">${tempPhone.priceRegular}</div>
              <div className="cardLayout__options-price-disc">${tempPhone.priceDiscount}</div>
            </div>
            <div className="cardLayout__options-price-controls">??component with buttons??</div>
          </div>
          <div className="cardLayout__options-info">
            <CardSpec spec={tempPhone} isTrimed={true} />
          </div>
        </div>
        <div className="cardLayout__specs">
          <div className="cardLayout__specs-title">Tech specs</div>
          <div className="cardLayout__specs-info">
            <CardSpec spec={tempPhone} isTrimed={false} />
          </div>
        </div>
        <div className="cardLayout__about">
          <div className="cardLayout__about-title">About</div>
          <div className="cardLayout__about-content">
            {tempPhone.description.map((content) => (
              <div className="cardLayout__about-content-main">
                <div className="cardLayout__about-content-main-title">{content.title}</div>
                <div className="cardLayout__about-content-main-text">{content.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
