import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Platform, UIManager } from 'react-native';
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
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};
