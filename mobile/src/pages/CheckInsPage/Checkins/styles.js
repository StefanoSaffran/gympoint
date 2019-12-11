import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 30px;
`;

export const CheckinButton = styled(Button)`
  margin: 20px 0 10px;
`;

export const CheckinList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 10, paddingBottom: 10 },
})``;

export const Checkin = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 46px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #fff;
  padding: 0 20px;
  margin: 5px 0;
`;

export const Left = styled.Text`
  height: 17px;
  color: #444;
  font-size: 14px;
  font-weight: 700;
`;

export const Right = styled.Text`
  height: 17px;
  color: #666;
  font-size: 14px;
  font-weight: 400;
`;
