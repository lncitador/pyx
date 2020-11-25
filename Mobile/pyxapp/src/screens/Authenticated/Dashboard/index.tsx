/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Button } from 'react-native';
import Header from '../../../components/Header';

import { useAuth } from '../../../hooks/auth';
import Survey from './pages/Survey';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { singOut } = useAuth();
  return (
    <>
      <Header />
      <Container>
        <Survey />
        <Button title="Sair" onPress={singOut} />
      </Container>
    </>
  );
};

export default Dashboard;
