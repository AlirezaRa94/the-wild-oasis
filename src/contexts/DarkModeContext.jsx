import { createContext, useContext, useEffect } from "react";
import propTypes from "prop-types";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

DarkModeProvider.propTypes = {
  children: propTypes.node,
};

function DarkModeProvider({ children }) {
  const userPrefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    userPrefersDarkMode,
    "isDarkMode"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((mode) => !mode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }

  return context;
}

export { DarkModeProvider, useDarkMode };
