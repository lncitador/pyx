import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 52px;
  height: 42px;
  padding: 2px;
  border-radius: 10px;
  background-color: #4a6572;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin-bottom: 8px;
  margin-left: 16px;
`;
export const Button = styled(RectButton)`
  width: 48px;
  height: 38px;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: #232f34;
  border-radius: 10px;
`;

export const IconButton = styled(FeatherIcon)`
  justify-content: center;
  align-items: center;
  align-content: center;
`;
