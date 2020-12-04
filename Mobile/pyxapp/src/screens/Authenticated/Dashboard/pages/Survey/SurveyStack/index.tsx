import React from 'react';

import { Button, Text } from 'react-native';
import { useApi } from '../../../../../../hooks/api';

import { Container } from './styles';

const SurveyStack: React.FC = () => {
  const { vehicle, changeStack } = useApi();
  return (
    <Container>
      <Text>{vehicle.driver}</Text>
      <Button
        title="terminar vistoria"
        onPress={() => {
          changeStack();
        }}
      />
    </Container>
  );
};

export default SurveyStack;
