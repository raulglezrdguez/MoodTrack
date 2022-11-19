import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import format from 'date-fns/format';
import { MoodOptionWithTimestamp } from '../types';
import { theme } from '../theme';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  return (
    <View style={styles.moodItem}>
      <Text style={styles.moodValue}>{item.mood.emoji}</Text>
      <View style={styles.descriptionAndDate}>
        <Text style={styles.moodDescription}>{item.mood.description}</Text>
        <Text style={styles.moodDate}>
          {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  descriptionAndDate: {
    justifyContent: 'flex-start',
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyRegular,
  },
  moodDate: {
    textAlign: 'center',
    fontFamily: theme.fontFamilyLight,
    fontSize: 12,
    color: theme.colorLavender,
  },
});
