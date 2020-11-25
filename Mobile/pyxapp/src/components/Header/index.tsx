import React from 'react';

import {
  Container,
  LeftBar,
  TopBar,
  IconsLeft,
  IconsRight,
  Title,
  RightBar,
} from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <TopBar>
        <LeftBar>
          <IconsLeft name="menu" size={24} color="#F9AA33" />
          <Title>Vistoria</Title>
        </LeftBar>
        <RightBar>
          <IconsRight name="notifications" size={24} color="#F9AA33" />
          <IconsRight name="inbox" size={24} color="#F9AA33" />
        </RightBar>
      </TopBar>
    </Container>
  );
};

export default Header;
