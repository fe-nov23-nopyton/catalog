import { useState } from "react";
import { generateRandomId } from "../../../utils/generateRandomId";
import classNames from "classnames";
import "./DropdownLang.scss";

interface Option {
  code: string;
  flag: JSX.Element;
}

interface Props {
  value: Option;
  list: Option[];
  handleClick: (param: string) => void;
}

export const DropdownLang: React.FC<Props> = ({ value, list, handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonContent, setButtonContent] = useState(value.flag || list[0].flag);

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

  const handleOnClick = (item: Option) => {
    handleClick(item.code);
    setButtonContent(item.flag);
    closeDropdown();
  };

  const id = generateRandomId();

  return (
    <div className="dropdownLang">
      <button
        id={id}
        type="button"
        className={classNames("dropdownLang--button", {
          "dropdownLang--button-isActive": isOpen
        })}
        onClick={toggleDropdown}
        onBlur={handleOnBlur}
      >
        {buttonContent}
      </button>
      {isOpen && (
        <div className="dropdownLang--container">
          <div className="dropdownLang--menu" role="menu">
            {list.map((item) => (
              <div className="dropdownLang--item" onClick={() => handleOnClick(item)} key={item.code}>
                {item.flag}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
