import React, { useCallback, useContext, useState } from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from './types';

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectedMood: (mood: MoodOptionType) => void;
};

const defaultValue: AppContextType = {
  moodList: [],
  handleSelectedMood: () => {},
};

const AppContext = React.createContext<AppContextType>(defaultValue);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectedMood = useCallback((mood: MoodOptionType) => {
    setMoodList(currentList => [
      ...currentList,
      { mood, timestamp: Date.now() },
    ]);
  }, []);

  return (
    <AppContext.Provider value={{ moodList, handleSelectedMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
