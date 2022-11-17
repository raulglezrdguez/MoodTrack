import React, { useCallback, useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { MoodOptionType, MoodOptionWithTimestamp } from '../types';
import { AppContext } from './App.context';

const storageKey = 'moods-data';

type AppData = {
  moods: MoodOptionWithTimestamp[];
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectedMood = useCallback((mood: MoodOptionType) => {
    setMoodList(currentList => {
      const newList = [...currentList, { mood, timestamp: Date.now() }];
      setData({ moods: newList });
      return newList;
    });
  }, []);

  const getData = async (): Promise<AppData | null> => {
    try {
      const data = await AsyncStorage.getItem(storageKey);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch {
      return null;
    }
  };

  const setData = async (data: AppData) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(data));
    } catch {}
  };

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getData();
      if (data) {
        setMoodList(data.moods);
      }
    };
    getDataFromStorage();
  }, []);

  return (
    <AppContext.Provider value={{ moodList, handleSelectedMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
