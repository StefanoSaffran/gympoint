import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

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

HeaderLogo.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    state: PropTypes.shape({
      routeName: PropTypes.string,
    }),
  }),
};

HeaderLogo.defaultProps = {
  navigation: null,
};

export default HeaderLogo;
