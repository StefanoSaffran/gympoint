import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import {
  Container,
  NewOrder,
  Top,
  Status,
  StatusText,
  Time,
  Question,
} from './styles';

export default function Order({ data, onClick }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container>
      <NewOrder onPress={onClick}>
        <Top>
          <Status>
            <Icon
              name="check-circle"
              size={16}
              color={data.answer ? '#42cb59' : '#999'}
            />
            <StatusText answered={data.answer}>
              {data.answer ? 'Respondido' : 'Sem resposta'}
            </StatusText>
          </Status>
          <Time>{dateParsed}</Time>
        </Top>
        <Question numberOfLines={3}>{data.question}</Question>
      </NewOrder>
    </Container>
  );
}
