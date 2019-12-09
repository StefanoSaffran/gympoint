import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 30px;
`;

export const NewOrderButton = styled(Button)`
  margin: 20px 0 10px;
`;

export const HelpOrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 10, paddingBottom: 10 },
})``;
