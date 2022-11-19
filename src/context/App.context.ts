import { createContext } from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectedMood: (mood: MoodOptionType) => void;
  handleDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};

const defaultValue: AppContextType = {
  moodList: [],
  handleSelectedMood: () => {},
  handleDeleteMood: () => {},
};

export const AppContext = createContext<AppContextType>(defaultValue);
