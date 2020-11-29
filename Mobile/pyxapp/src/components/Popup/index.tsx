import React from 'react';
import { ViewProps } from 'react-native';

import { ContainerPopups, PopupsText } from './styles';

interface PopupsProps extends ViewProps {
  children: string;
}

const Popups: React.FC<PopupsProps> = ({ children, ...rest }) => (
  <ContainerPopups {...rest}>
    <PopupsText>{children}</PopupsText>
  </ContainerPopups>
);

export default Popups;
