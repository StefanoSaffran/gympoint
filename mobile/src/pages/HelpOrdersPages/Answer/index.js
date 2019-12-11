import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Background from '~/components/Background';
import {
  Container,
  Question,
  QuestionHeader,
  QuestionText,
  Time,
  QuestionBody,
  AnswerWrapper,
  AnswerHeader,
  AnswerBody,
} from './styles';

export default function Answer({ navigation }) {
  const order = navigation.getParam('order');

  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(order.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [order.createdAt]);

  return (
    <Background>
      <Container>
        <Question>
          <QuestionHeader>
            <QuestionText>pergunta</QuestionText>
            <Time>{dateParsed}</Time>
          </QuestionHeader>
          <QuestionBody>{order.question}</QuestionBody>
        </Question>
        <AnswerWrapper>
          <AnswerHeader>resposta</AnswerHeader>
          <AnswerBody>{order.answer}</AnswerBody>
        </AnswerWrapper>
      </Container>
    </Background>
  );
}
