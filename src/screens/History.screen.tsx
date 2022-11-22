import React from 'react';
import { useAppContext } from '../context/App.provider';
import { MoodItemRow } from '../components/MoodItemRow';
import Reanimated from 'react-native-reanimated';

export const History: React.FC = () => {
  const { moodList } = useAppContext();

  return (
    <Reanimated.ScrollView>
      {moodList.map(ml => (
        <MoodItemRow key={ml.timestamp} item={ml} />
      ))}
    </Reanimated.ScrollView>
  );
};
