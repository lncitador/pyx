import React from 'react';
import { Button } from 'react-native';
import Header from '../../../components/Header';
import { useApi } from '../../../hooks/api';

import { useAuth } from '../../../hooks/auth';
import Survey from './pages/Survey';
import SurveyStack from './pages/Survey/SurveyStack/';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { singOut } = useAuth();
  const { stack } = useApi();
  return (
    <>
      <Header />
      <Container>
        {stack ? <SurveyStack /> : <Survey />}
        <Button title="Sair" onPress={singOut} />
      </Container>
    </>
  );
};

export default Dashboard;
