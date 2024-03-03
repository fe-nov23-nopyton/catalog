import classNames from "classnames";
import { ButtonType } from "../../../types/ButtonType";

import "./Button.scss";
import { useTranslation } from "react-i18next";

interface Props {
  handleClick?: () => void;
  buttonText?: string;
  isSelected?: boolean;
  buttonType: ButtonType;
  isArrowRight?: boolean;
}

export const Button: React.FC<Props> = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClick = () => {},
  buttonText = "",
  isSelected = false,
  buttonType = ButtonType.Primary,
  isArrowRight = false
}) => {
  const { t } = useTranslation();
  return (
    <button
      className={classNames("button", {
        "button-primary": buttonType === ButtonType.Primary,
        "button-primary-selected": isSelected && buttonType === ButtonType.Primary,

        "button-navigation": buttonType === ButtonType.Navigation,
        "button-navigation-reverseArrow": buttonType === ButtonType.Navigation && isArrowRight
      })}
      type="button"
      onClick={handleClick}
    >
      {isSelected && buttonType === ButtonType.Primary ? t("button.addedToCart") : buttonText}
    </button>
  );
};
