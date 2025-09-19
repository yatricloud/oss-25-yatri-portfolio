import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Theme = 'blue' | 'orange' | 'green' | 'purple' | 'rose';

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
  availableThemes: { id: Theme; name: string; colors: string[]; gradient: string }[];
  colors: {
    primaryBg: string;
    primaryBgHover: string;
    primaryBg400: string;
    primaryBg300: string;
    primaryBg200: string;
    primaryBg100: string;
    primaryText: string;
    primaryTextHover: string;
    border500: string;
    border400: string;
    border300: string;
    gradientStrong: string;
    gradientStrongHover: string;
    gradientSoft: string;
    indicatorDot: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeColors: Record<Theme, ThemeContextType['colors']> = {
  blue: {
    primaryBg: 'bg-blue-500',
    primaryBgHover: 'hover:bg-blue-600',
    primaryBg400: 'bg-blue-400',
    primaryBg300: 'bg-blue-300',
    primaryBg200: 'bg-blue-200',
    primaryBg100: 'bg-blue-100',
    primaryText: 'text-blue-500',
    primaryTextHover: 'hover:text-blue-600',
    border500: 'border-blue-500',
    border400: 'border-blue-400',
    border300: 'border-blue-300',
    gradientStrong: 'from-blue-500 to-blue-600',
    gradientStrongHover: 'hover:from-blue-600 hover:to-blue-700',
    gradientSoft: 'from-blue-50 to-blue-100',
    indicatorDot: 'bg-blue-500',
  },
  orange: {
    primaryBg: 'bg-orange-500',
    primaryBgHover: 'hover:bg-orange-600',
    primaryBg400: 'bg-orange-400',
    primaryBg300: 'bg-orange-300',
    primaryBg200: 'bg-orange-200',
    primaryBg100: 'bg-orange-100',
    primaryText: 'text-orange-500',
    primaryTextHover: 'hover:text-orange-600',
    border500: 'border-orange-500',
    border400: 'border-orange-400',
    border300: 'border-orange-300',
    gradientStrong: 'from-orange-500 to-orange-600',
    gradientStrongHover: 'hover:from-orange-600 hover:to-orange-700',
    gradientSoft: 'from-orange-50 to-orange-100',
    indicatorDot: 'bg-orange-500',
  },
  green: {
    primaryBg: 'bg-green-500',
    primaryBgHover: 'hover:bg-green-600',
    primaryBg400: 'bg-green-400',
    primaryBg300: 'bg-green-300',
    primaryBg200: 'bg-green-200',
    primaryBg100: 'bg-green-100',
    primaryText: 'text-green-500',
    primaryTextHover: 'hover:text-green-600',
    border500: 'border-green-500',
    border400: 'border-green-400',
    border300: 'border-green-300',
    gradientStrong: 'from-green-500 to-green-600',
    gradientStrongHover: 'hover:from-green-600 hover:to-green-700',
    gradientSoft: 'from-green-50 to-green-100',
    indicatorDot: 'bg-green-500',
  },
  purple: {
    primaryBg: 'bg-purple-500',
    primaryBgHover: 'hover:bg-purple-600',
    primaryBg400: 'bg-purple-400',
    primaryBg300: 'bg-purple-300',
    primaryBg200: 'bg-purple-200',
    primaryBg100: 'bg-purple-100',
    primaryText: 'text-purple-500',
    primaryTextHover: 'hover:text-purple-600',
    border500: 'border-purple-500',
    border400: 'border-purple-400',
    border300: 'border-purple-300',
    gradientStrong: 'from-purple-500 to-purple-600',
    gradientStrongHover: 'hover:from-purple-600 hover:to-purple-700',
    gradientSoft: 'from-purple-50 to-purple-100',
    indicatorDot: 'bg-purple-500',
  },
  rose: {
    primaryBg: 'bg-rose-500',
    primaryBgHover: 'hover:bg-rose-600',
    primaryBg400: 'bg-rose-400',
    primaryBg300: 'bg-rose-300',
    primaryBg200: 'bg-rose-200',
    primaryBg100: 'bg-rose-100',
    primaryText: 'text-rose-500',
    primaryTextHover: 'hover:text-rose-600',
    border500: 'border-rose-500',
    border400: 'border-rose-400',
    border300: 'border-rose-300',
    gradientStrong: 'from-rose-500 to-rose-600',
    gradientStrongHover: 'hover:from-rose-600 hover:to-rose-700',
    gradientSoft: 'from-rose-50 to-rose-100',
    indicatorDot: 'bg-rose-500',
  },
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('blue');

  const availableThemes = [
    { id: 'blue' as Theme, name: 'Ocean Blue', colors: ['#3B82F6', '#1D4ED8', '#1E40AF', '#1E3A8A'], gradient: 'from-blue-400 via-blue-500 to-blue-600' },
    { id: 'orange' as Theme, name: 'Sunset Orange', colors: ['#F97316', '#EA580C', '#DC2626', '#B91C1C'], gradient: 'from-orange-400 via-orange-500 to-red-500' },
    { id: 'green' as Theme, name: 'Emerald Green', colors: ['#10B981', '#059669', '#047857', '#065F46'], gradient: 'from-emerald-400 via-emerald-500 to-green-600' },
    { id: 'purple' as Theme, name: 'Royal Purple', colors: ['#A855F7', '#7C3AED', '#6D28D9', '#5B21B6'], gradient: 'from-purple-400 via-purple-500 to-purple-600' },
    { id: 'rose' as Theme, name: 'Rose Pink', colors: ['#F43F5E', '#E11D48', '#BE123C', '#9F1239'], gradient: 'from-rose-400 via-rose-500 to-rose-600' },
  ];

  const colors = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes, colors }}>
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