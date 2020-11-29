import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  width: number;
}

interface InputViewProps {
  isFocused: boolean;
  isErrored: boolean;
  isDisabled: boolean;
}

export const Container = styled.View<ContainerProps>`
  margin-bottom: 8px;
  ${(props) =>
    props.width &&
    css`
      width: ${props.width}%;
    `};
`;

export const InputView = styled.View<InputViewProps>`
  height: 42px;
  padding: 0 16px;
  background: #232f34;
  border-radius: 10px;
  border-width: 2px;
  border-color: #4a6572;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #f93333;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #9bb5c0;
    `}

    ${(props) =>
    props.isDisabled &&
    css`
      background-color: #344955;
      border-color: #232f34;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #f2f2f2;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;

export const Label = styled.Text`
  width: 100%;
  font-family: Roboto;
  color: #9bb5c0;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
