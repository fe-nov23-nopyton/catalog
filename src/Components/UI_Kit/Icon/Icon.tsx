import classNames from "classnames";
import "./Icon.scss";
import { Colors } from "../../../types/Colors";
import { IconContent } from "../../../types/IconContent";

interface Props {
  handleClick: () => void;
  iconType: IconContent;
  color?: Colors; //required only for iconType === IconContent.Color
  isSelected?: boolean; //required for all types, except iconType === IconContent.Arrow
  content?: string; //required only for iconType === IconContent.Text
  isDisabled?: boolean; //required only for iconType === IconContent.Arrow
}

export const Icon: React.FC<Props> = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleClick = () => {},
  color = Colors.Rosegold,
  isSelected = false,
  iconType = IconContent.Favorites,
  content = "1",
  isDisabled = false
}) => (
  <button
    className={classNames("icon", {
      "icon-favorite": iconType === IconContent.Favorites,
      "icon-favorite-selected": isSelected && iconType === IconContent.Favorites,

      "icon-arrow": iconType === IconContent.Arrow,
      "icon-arrow-disabled": isDisabled && iconType === IconContent.Arrow,

      "icon-text": iconType === IconContent.Text,
      "icon-text-selected": isSelected && iconType === IconContent.Text,

      "icon-colors": iconType === IconContent.Color,
      "icon-colors-selected": isSelected && iconType === IconContent.Color
    })}
    type="button"
    disabled={isDisabled}
    onClick={handleClick}
  >
    <div
      className={classNames({
        "icon-color": iconType === IconContent.Color,
        "icon-color-black": iconType === IconContent.Color && color === Colors.Black,
        "icon-color-rosegold": iconType === IconContent.Color && color === Colors.Rosegold,
        "icon-color-gold": iconType === IconContent.Color && color === Colors.Gold,
        "icon-color-silver": iconType === IconContent.Color && color === Colors.Silver
      })}
    >
      {iconType === IconContent.Text && content}
    </div>
  </button>
);
