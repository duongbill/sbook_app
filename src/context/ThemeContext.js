import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightTheme, DarkTheme } from './Theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light'); // 'light' | 'dark'

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('user-theme');
      if (saved) setThemeMode(saved);
    };
    loadTheme();
  }, []);

  const setTheme = async (mode) => {
    setThemeMode(mode);
    await AsyncStorage.setItem('user-theme', mode);
  };

  const theme = themeMode === 'dark' ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, setTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
