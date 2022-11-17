import React from 'react';
import { ScrollView } from 'react-native';
import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

export const History: React.FC = () => {
  const { moodList } = useAppContext();

  return (
    <ScrollView>
      {moodList.map(ml => (
        <MoodItemRow key={ml.timestamp} item={ml} />
      ))}
    </ScrollView>
  );
};