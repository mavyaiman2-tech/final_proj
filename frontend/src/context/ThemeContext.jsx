import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or system preference on initial load
    const savedTheme = localStorage.getItem('clearpath_theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      // Dark mode — set both html.dark (Tailwind) and body.dark-mode (vanilla CSS)
      document.body.classList.add('dark-mode', 'tw-bg-[#0a0b0d]', 'tw-text-white');
      document.body.classList.remove('tw-bg-slate-50', 'tw-bg-[#0a0b0d]', 'tw-text-slate-900');
>>>>>>> 8144d04 (latest updates)
=======
      document.documentElement.classList.add('dark', 'tw-dark');
      document.body.classList.add('dark-mode', 'tw-bg-[#0a0b0d]', 'tw-text-white');
      document.body.classList.remove('tw-bg-slate-50', 'tw-bg-[#0a0b0d]', 'tw-text-slate-900');
=======
      document.body.classList.add('dark-mode', 'tw-bg-[#0a0b0d]', 'tw-text-white');
      document.body.classList.remove('tw-bg-slate-50', 'tw-text-slate-900');
>>>>>>> 8144d04 (latest updates)
      localStorage.setItem('clearpath_theme', 'dark');
    } else {
      // Light mode — remove all dark classes
      document.documentElement.classList.remove('dark', 'tw-dark');
<<<<<<< HEAD
      document.body.classList.remove('tw-bg-[#0a0b0d]', 'tw-text-white', 'dark-mode');
      document.body.classList.add('tw-text-slate-900');
      document.body.style.background = '#FFFAF2';
=======
      document.body.classList.remove('dark-mode', 'tw-bg-[#0a0b0d]', 'tw-text-white');
      document.body.classList.add('tw-bg-slate-50', 'tw-text-slate-900');
>>>>>>> 8144d04 (latest updates)
      localStorage.setItem('clearpath_theme', 'light');
    }
  }, [isDarkMode]);

  // Listen to OS theme changes and follow them if user hasn't overridden manually
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleOsChange = (e) => {
      const saved = localStorage.getItem('clearpath_theme');
      if (!saved) setIsDarkMode(e.matches); // only follow OS if no manual preference
    };
    mq.addEventListener('change', handleOsChange);
    return () => mq.removeEventListener('change', handleOsChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
