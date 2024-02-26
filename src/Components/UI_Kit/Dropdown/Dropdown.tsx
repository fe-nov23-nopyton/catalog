import { useState } from "react";
import "./Dropdown.scss";
import classNames from "classnames";

interface Props {
  title?: string;
  list: string[];
  handleClick: (param: string) => void;
}

export const Dropdown: React.FC<Props> = ({ list, handleClick, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonContent, setButtonContent] = useState(list[0]);

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

  return (
    <div className="dropdown">
      <div className="dropdown--title">{title}</div>
      <button
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
