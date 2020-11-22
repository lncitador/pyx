import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #344955;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #344955;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #f93333;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #4a6572;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #f2f2f2;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
