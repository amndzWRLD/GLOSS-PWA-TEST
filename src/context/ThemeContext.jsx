import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "gloss-theme";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Buscar si ya existe un tema guardado
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    // Si existe, usarlo
    if (savedTheme) return savedTheme;

    // Primer inicio: mantener el diseño original de GLOSS
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}