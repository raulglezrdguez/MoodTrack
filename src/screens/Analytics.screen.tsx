import React, { useCallback } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { VictoryPie } from 'victory-native';
import { useAppContext } from '../context/App.provider';
import { theme } from '../theme';

export const Analytics: React.FC = () => {
  const { moodList } = useAppContext();

  const moodListData = useCallback(() => {
    const result: { label: string; y: number }[] = [];
    moodList.map(ml => {
      const found = result.find(r => r.label === ml.mood.emoji);
      if (found) {
        found.y += 1;
      } else {
        result.push({ label: ml.mood.emoji, y: 1 });
      }
    });
    return result;
  }, [moodList]);

  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <VictoryPie
        data={moodListData()}
        width={width - width / 5}
        // theme={VictoryTheme.material}
        // cornerRadius={({ datum }) => datum.y / 2}
        // innerRadius={({ datum }) => datum.y / 2}
        // labelComponent={<VictoryLabel angle={-15} />}
        labels={({ datum }) => datum.label}
        labelRadius={width / 5}
        radius={width / 3}
        innerRadius={width / 8}
        colorScale={[
          theme.colorPurple,
          theme.colorLavender,
          theme.colorBlue,
          theme.colorGrey,
          theme.colorRed,
        ]}
        style={{ labels: { fontSize: 30 } }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
