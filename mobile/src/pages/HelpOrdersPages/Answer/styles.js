import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  margin: 22px 20px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
`;

export const Question = styled.View`
  padding: 20px 20px 25px;
`;

export const QuestionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const QuestionText = styled.Text`
  color: #444;
  font-size: 14px;
  font-weight: 700 bold;
  text-transform: uppercase;
`;

export const Time = styled.Text`
  color: #666;
  font-size: 14px;
  font-weight: 400;
`;

export const QuestionBody = styled.Text`
  line-height: 26px;
  color: #666;
  font-size: 14px;
  font-weight: 400;
`;

export const AnswerWrapper = styled.View`
  padding: 0 20px 27px;
`;

export const AnswerHeader = styled.Text`
  margin-bottom: 15px;
  color: #444;
  font-size: 14px;
  font-weight: 700 bold;
  text-transform: uppercase;
`;

export const AnswerBody = styled.Text`
  line-height: 26px;
  color: #666;
  font-size: 14px;
  font-weight: 400;
`;
