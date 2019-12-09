import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import Background from '~/components/Background';
import {
  Container,
  CheckinButton,
  CheckinList,
  Checkin,
  Left,
  Right,
} from './styles';

function Checkins({ isFocused }) {
  const [checkins, setCheckins] = useState([]);
  const id = useSelector(state => state.student.id);

  const loadCheckins = async () => {
    const { data } = await api.get(`students/${id}/checkins`);

    const formattedData = data.map(checkin => ({
      ...checkin,
      timeDistance: formatDistance(parseISO(checkin.createdAt), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    }));

    setCheckins(formattedData);
  };

  useEffect(() => {
    if (isFocused) {
      loadCheckins();
    }
  }, [isFocused]); // eslint-disable-line

  const handleCheckin = async () => {
    try {
      await api.post(`students/${id}/checkins`);

      loadCheckins();
    } catch (err) {
      Alert.alert('Falha ao realizar o CheckIn', err.response.data.error);
    }
  };

  return (
    <Background>
      <Container>
        <CheckinButton onPress={handleCheckin}>Novo check-in</CheckinButton>
        <CheckinList
          data={checkins.sort((a, b) => b.id - a.id)}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Checkin>
              <Left>{`Check-in #${item.id}`}</Left>
              <Right>{item.timeDistance}</Right>
            </Checkin>
          )}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Checkins);
