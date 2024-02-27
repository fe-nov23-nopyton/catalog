/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from "react";
import NazariiPhoto from "./fotos/Nazarii.png";

import "./Contacts.scss";
import { Person } from "./Person/Person";

const contacts = [
  {
    id: 1,
    photo: NazariiPhoto,
    name: "Nazarii Saviak",
    email: "erdfd@fdfs.com",
    phone: "+380 66 66 66 666"
  },
  {
    id: 2,
    photo: NazariiPhoto,
    name: "Vadym Sainiuk",
    email: "ddv@efv.com",
    phone: "+380 77 77 77 777"
  },
  {
    id: 3,
    photo: NazariiPhoto,
    name: "Rezanov Oleksandr",
    email: "fsdv@rfvr.com",
    phone: "+380 88 88 88 888"
  },
  {
    id: 4,
    photo: NazariiPhoto,
    name: "Kalashnyk Maksym",
    email: "umojh@vrfcom",
    phone: "+380 99 99 99 999"
  },
  {
    id: 5,
    photo: NazariiPhoto,
    name: "Kulikovskyi Ivan",
    email: "vosdpcj@vprlf.com",
    phone: "+380 11 11 11 111"
  }
];

export const Contacts: React.FC = () => (
  <div className="contacts">
    {contacts.map((person) => (
      <Person key={person.id} photo={person.photo} name={person.name} email={person.email} phone={person.phone} />
    ))}
  </div>
);
