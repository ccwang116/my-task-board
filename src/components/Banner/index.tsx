import React, { useContext } from "react";
import { ColorThemeStorage } from "contexts/ColorTheme";

import { ReactComponent as Clipboard } from "images/clipboard-regular.svg";
import classNames from "classnames/bind";
import classes from "./styles.module.scss";
const cx = classNames.bind(classes);

const Banner: React.FC = () => {
  const themeData = useContext(ColorThemeStorage);
  const theme: { [key: string]: string } = {
    dark: "#fff",
    light: "#4a4d4e",
  };
  return (
    <div>
      <img
        className={cx("banner")}
        src="https://cdn.pixabay.com/photo/2018/10/09/10/01/architecture-3734552_960_720.jpg"
        alt="banner"
      />
      {/* <img src={clipboard} alt="icon" className={cx("icon")} /> */}
      <Clipboard
        fill={theme[themeData?.themeName!] || undefined}
        className={cx("icon")}
      />
    </div>
  );
};

export default Banner;
