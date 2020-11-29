import styled, { css } from 'styled-components/native';

interface ContainerProps {
  width?: number;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  margin-bottom: 8px;
  ${(props) =>
    props.width &&
    css`
      width: ${props.width}%;
    `};
`;

export const InputView = styled.View`
  height: 42px;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  background: #232f34;
  border-radius: 10px;
  border-width: 2px;
  border-color: #4a6572;
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
