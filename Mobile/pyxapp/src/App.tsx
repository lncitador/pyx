/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar backgroundColor="#232F34" barStyle="light-content" translucent />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#232F34' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
