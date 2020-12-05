import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { Button, Text } from 'react-native';
import { useApi } from '../../../../../../hooks/api';

import { Container } from './styles';

const SurveyStack: React.FC = () => {
  const navigate = useNavigation();
  const { vehicle, changeSurvey } = useApi();
  return (
    <Container>
      <Text>{vehicle.driver}</Text>
      <Button
        title="terminar vistoria"
        onPress={() => {
          navigate.navigate('FindPlate');
          changeSurvey();
        }}
      />
    </Container>
  );
};

export default SurveyStack;
