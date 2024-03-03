import React from "react";
import "./Person.scss";
import { useTranslation } from "react-i18next";

interface Props {
  photo: string;
  name: string;
  phone: string;
  email: string;
}

export const Person: React.FC<Props> = ({ phone, name, email, photo }) => {
  const { t } = useTranslation();
  return (
    <div className="person animate">
      <div className="person__image-container">
        <img className="person__image" src={photo} alt={name} />
      </div>

      <div className="person__details">
        <h2 className="person__details-name">{name}</h2>

        <div className="person__feature">
          <p className="person__feature-name">{t("contactsPage.email")}: </p>

          <p className="person__feature-value">{email}</p>
        </div>
        <div className="person__feature">
          <p className="person__feature-name">{t("contactsPage.phone")}:</p>

          <p className="person__feature-value">{phone}</p>
        </div>
      </div>
    </div>
  );
};
