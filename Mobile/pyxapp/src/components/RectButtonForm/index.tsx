import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, Button, IconButton } from './styles';

interface ButtonProps extends RectButtonProperties {
  icon: string;
}

const RectButtonForm: React.FC<ButtonProps> = ({ icon, ...rest }) => (
  <Container>
    <Button {...rest}>
      <IconButton name={icon} size={20} color={'#4A6572'} />
    </Button>
  </Container>
);

export default RectButtonForm;
