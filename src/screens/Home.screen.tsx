import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { theme } from '../theme';

export const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <MoodPicker />
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
