import classNames from "classnames";

export const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
  classNames("buttons_header", { "header-item-active": isActive });
