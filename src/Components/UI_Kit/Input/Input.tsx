/* eslint-disable prettier/prettier */
import { generateRandomId } from "../../../utils/generateRandomId";
import "./Input.scss";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  title: string;
}

export const Input = (props: InputProps) => {
  const { type, placeholder, value, onChange, name, title } = props;

  const id = generateRandomId();

  return (
    <div className="input">
      <label htmlFor={id} className="input--title">{title}</label>
      <input
        id={id}
        className="input--button"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};
