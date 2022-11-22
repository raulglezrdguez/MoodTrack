import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import format from 'date-fns/format';
import Reanimated, {
  Layout,
  runOnJS,
  SlideOutLeft,
  SlideOutRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { MoodOptionWithTimestamp } from '../types';
import { theme } from '../theme';
import { AppContext } from '../context/App.context';
import { DeleteIcon } from './Icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

const maxPan = 100;

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  const { handleDeleteMood } = useContext(AppContext);

  // const handleDelete = useCallback(() => {
  //   // LayoutAnimation.configureNext({
  //   //   duration: 300,
  //   //   create: { type: 'easeInEaseOut', property: 'opacity' },
  //   //   update: { type: 'easeInEaseOut', property: 'opacity' },
  //   //   delete: { type: 'easeInEaseOut', property: 'opacity' },
  //   // });
  //   // LayoutAnimation.easeInEaseOut();
  //   handleDeleteMood(item);
  // }, [handleDeleteMood, item]);

  const offsetX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offsetX.value,
      },
    ],
  }));

  const gesture = Gesture.Pan()
    // .onBegin(() => {
    //   console.log('first');
    // })
    .onUpdate(event => {
      offsetX.value = event.translationX;
    })
    .onEnd(event => {
      if (Math.abs(event.translationX) > maxPan) {
        offsetX.value = withTiming(
          1000 * Math.sign(event.translationX),
          {
            duration: 1000,
          },
          () => {
            runOnJS(handleDeleteMood)(item);
          },
        );
      } else {
        offsetX.value = withTiming(0, { duration: 200 });
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Reanimated.View
        layout={Layout.springify()}
        exiting={
          Math.random() > 0.5
            ? SlideOutRight.delay(100)
            : SlideOutLeft.delay(100)
        }
        style={[styles.moodItem, animatedStyle]}>
        <Text style={styles.moodValue}>{item.mood.emoji}</Text>
        <View style={styles.descriptionAndDate}>
          <Text style={styles.moodDescription}>{item.mood.description}</Text>
          <Text style={styles.moodDate}>
            {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
          </Text>
        </View>
        <Pressable hitSlop={16} onPress={() => handleDeleteMood(item)}>
          <DeleteIcon color={theme.colorRed} />
        </Pressable>
      </Reanimated.View>
    </GestureDetector>
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
