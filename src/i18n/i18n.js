/* eslint-disable prettier/prettier */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { uk } from "./locales/uk.ts";
import { en } from "./locales/en.ts";

const resources = {
  en: {
    translation: en
  },
  uk: {
    translation: uk
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: window.localStorage.i18nextLng || "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
