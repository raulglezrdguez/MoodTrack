import { createContext } from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectedMood: (mood: MoodOptionType) => void;
};

const defaultValue: AppContextType = {
  moodList: [],
  handleSelectedMood: () => {},
};

export const AppContext = createContext<AppContextType>(defaultValue);
