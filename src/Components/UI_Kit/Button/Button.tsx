import classNames from "classnames";
import "./Button.scss";
import { ButtonType } from "../../../types/ButtonType";

interface Props {
  handleClick: () => void;
  buttonText: string;
  isSelected?: boolean;
  buttonType: ButtonType;
}

export const Button: React.FC<Props> = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClick = () => {},
  buttonText = "nav pass",
  isSelected = false,
  buttonType = "primary"
}) => (
  <button
    className={classNames("button", {
      "button-primary": buttonType === ButtonType.Primary,
      "button-primary-selected": isSelected && buttonType === ButtonType.Primary,

      "button-navigation": buttonType === ButtonType.Navigation
    })}
    type="button"
    onClick={handleClick}
  >
    {isSelected && buttonType === ButtonType.Primary ? "Added to cart" : buttonText}
  </button>
);
