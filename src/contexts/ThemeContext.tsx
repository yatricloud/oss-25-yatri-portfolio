import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = 'blue' | 'orange';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    primaryDark: string;
    accent: string;
    accentHover: string;
    gradient: string;
    gradientHover: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors = {
  blue: {
    primary: 'bg-blue-500',
    primaryHover: 'hover:bg-blue-600',
    primaryLight: 'bg-blue-100',
    primaryDark: 'bg-blue-700',
    accent: 'text-blue-500',
    accentHover: 'hover:text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    gradientHover: 'hover:from-blue-600 hover:to-blue-700',
  },
  orange: {
    primary: 'bg-orange-500',
    primaryHover: 'hover:bg-orange-600',
    primaryLight: 'bg-orange-100',
    primaryDark: 'bg-orange-700',
    accent: 'text-orange-500',
    accentHover: 'hover:text-orange-600',
    gradient: 'from-orange-500 to-orange-600',
    gradientHover: 'hover:from-orange-600 hover:to-orange-700',
  },
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('blue');

  const toggleTheme = () => {
    setTheme(prev => prev === 'blue' ? 'orange' : 'blue');
  };

  const colors = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};