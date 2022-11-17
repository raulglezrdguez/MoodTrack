import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { theme } from '../theme';
import { MoodOptionType } from '../types';

const moodOptions: MoodOptionType[] = [
  { emoji: '🤓', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '🤗', description: 'happy' },
  { emoji: '🤡', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

export const MoodPicker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();

  return (
    <View style={styles.container}>
      {moodOptions.map(option => (
        <View>
          <Pressable
            style={[
              styles.moodItem,
              option === selectedMood ? styles.selectedMoodItem : null,
            ]}
            key={option.emoji}
            onPress={() => setSelectedMood(option)}>
            <Text>{option.emoji}</Text>
          </Pressable>
          <Text style={styles.selectedMoodDescription}>
            {option === selectedMood ? option.description : ''}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  moodItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMoodItem: {
    borderColor: theme.colorRed,
    borderWidth: 1,
    backgroundColor: theme.colorPurple,
  },
  selectedMoodDescription: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colorPurple,
  },
});
