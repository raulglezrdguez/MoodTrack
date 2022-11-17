import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { theme } from '../theme';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';

export const Home: React.FC = () => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList(currentList => [
      ...currentList,
      { mood, timestamp: Date.now() },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <MoodPicker onSelectMood={handleSelectMood} />
      {moodList?.map(ml => (
        <Text key={ml.timestamp}>
          {ml.mood.emoji} - {new Date(ml.timestamp).toDateString()}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colorWhite,
  },
});
