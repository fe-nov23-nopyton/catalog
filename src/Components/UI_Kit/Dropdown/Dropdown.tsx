import { useState } from "react";
import "./Dropdown.scss";

interface Props {
  list: string[];
  handleClick: () => void;
}

export const Dropdown: React.FC<Props> = ({ list, handleClick }) => {
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
    handleClick();
    setButtonContent(item);
    closeDropdown();
  };

  return (
    <div className="dropdown">
      <button type="button" className="dropdown--button" onClick={toggleDropdown} onBlur={handleOnBlur}>
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
