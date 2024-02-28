import React from "react";
import "./Person.scss";

interface Props {
  photo: string;
  name: string;
  phone: string;
  email: string;
}

export const Person: React.FC<Props> = ({ phone, name, email, photo }) => (
  <div className="person animate">
    <div className="person__image-container">
      <img className="person__image" src={photo} alt={name} />
    </div>

    <div className="person__details">
      <h2 className="person__details-name">{name}</h2>

      <div className="person__feature">
        <p className="person__feature-name">email: </p>

        <p className="person__feature-value">{email}</p>
      </div>
      <div className="person__feature">
        <p className="person__feature-name">phone:</p>

        <p className="person__feature-value">{phone}</p>
      </div>
    </div>
  </div>
);
