import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SingIn from '../screens/NotAuthenticated/SingIn';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#232F34' },
    }}>
    <Auth.Screen name="SingIn" component={SingIn} />
  </Auth.Navigator>
);

export default AuthRoutes;
