import React from "react";
import "./Dropdown.scss";

interface Props {
  title: string;
  options: string[];
  handleChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown: React.FC<Props> = ({ title, options, handleChange }) => (
  <div className="dropdown-container">
    <label htmlFor={options[0]} className="title-select">
      {title}
    </label>
    <select id={options[0]} className="dropdown" onChange={(value) => handleChange(value)}>
      {options.map((option) => (
        <option className="option" value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
