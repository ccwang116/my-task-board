import React, { useContext } from "react";
// import { Route } from 'react-router-dom';
import TodoSample from "./components/TodoSample";
import Banner from "./components/Banner";
import MainBoard from "./components/MainBoard";
import { withColorThemeProvider } from "./contexts/ColorTheme";
import { ColorThemeStorage } from "./contexts/ColorTheme";
import "./App.css";

const App: React.FC = () => {
  const themeData = useContext(ColorThemeStorage);
  const theme: { [key: string]: string } = {
    dark: "darktheme",
    light: "lighttheme",
  };
  const modetheme: { [key: string]: string } = {
    dark: "modedark",
    light: "modelight",
  };
  const darkactive: { [key: string]: string } = {
    dark: "topBtnActive",
    light: "",
  };
  const lightactive: { [key: string]: string } = {
    dark: "",
    light: "topBtnActive",
  };
  return (
    <div className={`App ${themeData && theme[themeData.themeName]}`}>
      <div className="layout">
        <div className={`mode-card`}>
          <span className={`${themeData && modetheme[themeData.themeName]}`}>
            {themeData && themeData.themeName.toUpperCase() + " Mode"}
          </span>
          <div
            className={`circleBtn btnDark ${
              themeData && darkactive[themeData.themeName]
            }`}
            onClick={() => {
              themeData?.handleChangeTheme("dark");
            }}
          ></div>
          <div
            className={`circleBtn btnLight ${
              themeData && lightactive[themeData.themeName]
            }`}
            onClick={() => {
              themeData?.handleChangeTheme("light");
            }}
          ></div>
        </div>
        <Banner />
        <MainBoard />
      </div>
    </div>
  );
};

export default withColorThemeProvider(App);
