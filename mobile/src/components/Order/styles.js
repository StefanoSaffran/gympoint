import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  border: 1px solid #ddd;
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin: 0 0 10px;
`;
export const NewOrder = styled(RectButton)`
  flex-direction: column;
  padding: 20px 20px 25px;
`;

export const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Status = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 17px;
  color: #999;
  font-size: 14px;
  font-weight: 700;
`;

export const StatusText = styled.Text`
  margin-left: 8px;
  font-size: 14px;
  font-weight: 700 bold;
  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
  font-weight: 400;
`;

export const Question = styled.Text`
  margin-top: 15px;
  line-height: 26px;
  color: #666;
  font-size: 14px;
  font-weight: 400;
`;
