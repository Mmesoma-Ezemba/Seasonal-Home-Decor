import React, { createContext, useContext, useEffect, useState } from 'react';

export type Season = 'winter' | 'spring' | 'summer' | 'autumn';

interface ThemeContextType {
  season: Season;
  manualSeason: Season | null;
  setManualSeason: (season: Season | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getAutoSeason = (): Season => {
  const month = new Date().getMonth() + 1; // 1-12
  if (month === 12 || month === 1 || month === 2) return 'winter';
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  return 'autumn';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use a hydration-safe approach by starting with a default or getting it immediately if possible
  const [autoSeason, setAutoSeason] = useState<Season>(() => {
    return getAutoSeason();
  });
  const [manualSeason, setManualSeason] = useState<Season | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        return (localStorage.getItem('manualSeason') as Season) || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const currentSeason = manualSeason || autoSeason;

  useEffect(() => {
    try {
      if (manualSeason) {
        localStorage.setItem('manualSeason', manualSeason);
      } else {
        localStorage.removeItem('manualSeason');
      }
    } catch (e) { }
  }, [manualSeason]);

  useEffect(() => {
    // Add an interval to check for date changes occasionally (e.g., if user leaves tab open across midnight into a new month)
    const interval = setInterval(() => {
      setAutoSeason(getAutoSeason());
    }, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    // Remove all previous season classes
    root.classList.remove('theme-winter', 'theme-spring', 'theme-summer', 'theme-autumn');

    // Add current season class
    root.classList.add(`theme-${currentSeason}`);
  }, [currentSeason]);

  return (
    <ThemeContext.Provider value={{ season: currentSeason, manualSeason, setManualSeason }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
