import React, { useContext } from "react";
import { ColorThemeStorage } from "contexts/ColorTheme";

import classNames from "classnames/bind";
import classes from "./styles.module.scss";

const cx = classNames.bind(classes);
type CardHeadProps = {
  title: string;
};
const CardHead: React.FC<CardHeadProps> = (props) => {
  const themeData = useContext(ColorThemeStorage);

  function titleCase(arg: string) {
    return arg[0].toUpperCase() + arg.slice(1).toLowerCase();
  }
  const theme: { [key: string]: string } = {
    dark: "tagdark",
    light: "taglight",
  };
  return (
    <div className={cx("tag", theme[themeData?.themeName!])}>
      {titleCase(props.title)}
    </div>
  );
};

export default CardHead;
