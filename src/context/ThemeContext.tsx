import { createContext, ReactNode, useState, useEffect } from "react";

const THEME_STORAGE = "@theme:theme-1.0.0";

interface ThemeContextProviderProps {
  children: ReactNode;
}

interface ThemeContentType {
  theme: string;
  handleToggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContentType);

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<string>(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE);
    if (storedTheme) {
      return JSON.parse(storedTheme);
    }
    return "light";
  });

  function handleToggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE, JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
