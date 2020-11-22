/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Button } from 'react-native';

import { useAuth } from '../../../hooks/auth';
// import { Container } from './styles';yarn

const Dashboard: React.FC = () => {
  const { singOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Sair" onPress={singOut} />
    </View>
  );
};

export default Dashboard;
