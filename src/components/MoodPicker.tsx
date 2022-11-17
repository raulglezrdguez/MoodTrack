import React, { useCallback, useState } from 'react';
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

type MoodPickerProps = {
  onSelectMood: (mood: MoodOptionType) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelectMood }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();

  const handleSelectMood = useCallback(() => {
    if (selectedMood) {
      onSelectMood(selectedMood);
      setSelectedMood(undefined);
    }
  }, [onSelectMood, selectedMood]);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>How are you right now?</Text>
      <View style={styles.moodList}>
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
      <Pressable style={styles.button} onPress={handleSelectMood}>
        <Text style={styles.textButton}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colorPurple,
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 30,
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
  button: {
    backgroundColor: theme.colorPurple,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textButton: {
    color: theme.colorWhite,
  },
  textTitle: {
    color: theme.colorPurple,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});
