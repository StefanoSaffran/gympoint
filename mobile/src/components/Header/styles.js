import styled from 'styled-components/native';

import logo from '~/assets/logo-header.png';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  border: 1px solid #ddd;
`;

export const ContainerWithNav = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  flex-direction: row;
  border: 1px solid #ddd;
`;

export const LogoWrapper = styled.View`
  flex: 1;
  margin-right: 50px;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})`
  margin: 20px 0;
  align-self: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin: 0 0 0 20px;
`;
