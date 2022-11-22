import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Platform, StyleSheet, UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from './context/App.provider';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <AppProvider>
        <NavigationContainer>
          <BottomTabsNavigator />
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandler: { flex: 1 },
});
