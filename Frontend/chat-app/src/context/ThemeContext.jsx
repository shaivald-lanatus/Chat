import React, { createContext, useContext, useState, useEffect } from "react";
import { useThemeStore } from "../store/useThemeStore";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    if (theme) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
