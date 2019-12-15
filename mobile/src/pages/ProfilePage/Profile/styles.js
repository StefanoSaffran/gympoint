import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  align-self: stretch;
  flex: 1;
`;

export const MembershipInfo = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const StudentName = styled.View`
  margin-top: 30px;
  flex-direction: row;
  align-items: baseline;
`;

export const StudentEmail = styled.View`
  margin-top: 15px;
  flex-direction: row;
  align-items: baseline;
`;

export const Plan = styled.View`
  margin-top: 15px;
  flex-direction: row;
  align-items: baseline;
`;

export const Membership = styled.View`
  margin-top: 15px;
  flex-direction: row;
  align-items: baseline;
`;

export const Active = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const Until = styled.Text`
  margin-left: 10px;
  font-size: 13px;
  color: #999;
`;

export const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  padding-right: 10px;
`;

export const Name = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #666;
`;

export const Email = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #666;
`;

export const PlanTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #666;
`;

export const LogoutButton = styled(Button)`
  margin-top: 20px;
`;
