import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { useApi } from '../../hooks/api';

import {
  Container,
  LeftBar,
  TopBar,
  IconsLeft,
  IconsRight,
  Title,
  RightBar,
} from './styles';

interface HearderProps {
  title: string;
  back: boolean;
}
const Header: React.FC<HearderProps> = ({ title, back }) => {
  const navigation = useNavigation();
  const { changeSurvey } = useApi();
  return (
    <Container>
      <TopBar>
        <LeftBar>
          {back ? (
            <IconsLeft
              onPress={() => {
                // navigation.goBack();
              }}
              name="menu"
              size={24}
              color="#F9AA33"
            />
          ) : (
            <IconsLeft
              onPress={() => {
                navigation.goBack();
                changeSurvey();
              }}
              name="west"
              size={24}
              color="#F9AA33"
            />
          )}
          <Title>{title}</Title>
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
