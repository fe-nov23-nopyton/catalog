import { useState } from "react";
import "./Dropdown.scss";
import classNames from "classnames";
import { generateRandomId } from "../../../utils/generateRandomId";

interface Props {
  value: string;
  title?: string;
  list: string[];
  handleClick: (param: string) => void;
}

export const Dropdown: React.FC<Props> = ({ value, list, handleClick, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonContent, setButtonContent] = useState(value || list[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      closeDropdown();
    }, 100);
  };

  const handleOnClick = (item: string) => {
    handleClick(item);
    setButtonContent(item);
    closeDropdown();
  };

  const id = generateRandomId();

  return (
    <div className="dropdown">
      <label htmlFor={id} className="dropdown--title">
        {title}
      </label>
      <button
        id={id}
        type="button"
        className={classNames("dropdown--button", {
          "dropdown--button-isActive": isOpen
        })}
        onClick={toggleDropdown}
        onBlur={handleOnBlur}
      >
        {buttonContent}
      </button>
      {isOpen && (
        <div className="dropdown--container">
          <div className="dropdown--menu" role="menu">
            {list.map((item) => (
              <div className="dropdown--item" onClick={() => handleOnClick(item)} key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
