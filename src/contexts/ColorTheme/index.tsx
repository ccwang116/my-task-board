import React, { createContext, useState } from "react";

interface ThemeDataInterface {
  themeName: string;
  handleChangeTheme: (text: string) => void;
}
export const ColorThemeStorage = createContext<ThemeDataInterface | null>(null);

export const withColorThemeProvider = (WrappedComponent: React.FC) => {
  const ColorThemeProvider = (props: any) => {
    const [themeName, setThemeName] = useState("dark");
    const handleChangeTheme = (value: string) => {
      setThemeName(value);
    };
    const themeData = {
      themeName,
      handleChangeTheme,
    };

    return (
      <ColorThemeStorage.Provider value={themeData}>
        <WrappedComponent {...props} />
      </ColorThemeStorage.Provider>
    );
  };

  return ColorThemeProvider;
};
