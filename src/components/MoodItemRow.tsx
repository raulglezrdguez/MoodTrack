import React, { useCallback, useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import format from 'date-fns/format';
import Reanimated, { Layout, SlideOutRight } from 'react-native-reanimated';

import { MoodOptionWithTimestamp } from '../types';
import { theme } from '../theme';
import { AppContext } from '../context/App.context';
import { DeleteIcon } from './Icons';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  const { handleDeleteMood } = useContext(AppContext);

  const handleDelete = useCallback(() => {
    // LayoutAnimation.configureNext({
    //   duration: 300,
    //   create: { type: 'easeInEaseOut', property: 'opacity' },
    //   update: { type: 'easeInEaseOut', property: 'opacity' },
    //   delete: { type: 'easeInEaseOut', property: 'opacity' },
    // });
    // LayoutAnimation.easeInEaseOut();
    handleDeleteMood(item);
  }, [handleDeleteMood, item]);

  return (
    <Reanimated.View
      layout={Layout.springify()}
      exiting={SlideOutRight.delay(100)}
      style={styles.moodItem}>
      <Text style={styles.moodValue}>{item.mood.emoji}</Text>
      <View style={styles.descriptionAndDate}>
        <Text style={styles.moodDescription}>{item.mood.description}</Text>
        <Text style={styles.moodDate}>
          {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
        </Text>
      </View>
      <Pressable hitSlop={16} onPress={handleDelete}>
        <DeleteIcon color={theme.colorRed} />
      </Pressable>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
