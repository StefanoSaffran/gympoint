import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 30px;
  margin-top: 20px;
`;

export const OrderTextArea = styled(Input).attrs({
  textAlignVertical: 'top',
  padding: 0,
})`
  min-height: 180px;
  font-size: 16px;
  font-weight: 400;
  padding-top: 20px;
  line-height: 24px;
`;

export const SubmitButton = styled(Button)`
  margin: 20px 0 10px;
`;
