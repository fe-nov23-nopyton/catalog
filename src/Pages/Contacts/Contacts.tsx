import React from "react";
import { Person } from "./Person/Person";

import NazariiPhoto from "./fotos/Nazarii.png";
import Vadym from "./fotos/Vadym.png";
import Oleksandr from "./fotos/3.png";
import Maksym from "./fotos/4.png";
import Ivan from "./fotos/ivan.png";

import "./Contacts.scss";

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
    photo: Vadym,
    name: "Vadym Sainiuk",
    email: "ddv@efv.com",
    phone: "+380 77 77 77 777"
  },
  {
    id: 3,
    photo: Oleksandr,
    name: "Rezanov Oleksandr",
    email: "fsdv@rfvr.com",
    phone: "+380 88 88 88 888"
  },
  {
    id: 4,
    photo: Maksym,
    name: "Kalashnyk Maksym",
    email: "umojh@vrfcom",
    phone: "+380 99 99 99 999"
  },
  {
    id: 5,
    photo: Ivan,
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
