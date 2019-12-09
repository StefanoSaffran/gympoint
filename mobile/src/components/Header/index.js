import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  ContainerWithNav,
  Logo,
  LogoWrapper,
  BackButton,
} from './styles';

const HeaderLogo = ({ navigation }) => {
  return (
    <>
      {!navigation || navigation.state.routeName === 'HelpOrders' ? (
        <Container>
          <Logo />
        </Container>
      ) : (
        <ContainerWithNav>
          <BackButton
            onPress={() => {
              navigation.navigate('HelpOrders');
            }}
          >
            <Icon name="chevron-left" size={30} color="#000" />
          </BackButton>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </ContainerWithNav>
      )}
    </>
  );
};

export default HeaderLogo;
