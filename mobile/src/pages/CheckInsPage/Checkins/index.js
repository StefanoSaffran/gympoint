import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCheckins, setTotalCheckins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const id = useSelector(state => state.student.profile.id);

  const loadCheckins = async () => {
    try {
      const { data } = await api.get(`students/${id}/checkins`, {
        params: { page },
      });

      const formattedData = data.checkins.map(checkin => ({
        ...checkin,
        timeDistance: formatDistance(parseISO(checkin.createdAt), new Date(), {
          addSuffix: true,
          locale: pt,
        }),
      }));

      setCheckins(page > 1 ? [...checkins, ...formattedData] : formattedData);
      setTotalPages(Math.ceil(data.count / 10));
      setTotalCheckins(data.count);
    } catch (err) {
      Alert.alert(
        'Falha ao realizar o CheckIn',
        err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor'
      );
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (page === totalPages || loading) return;

    setLoading(true);
    setPage(page + 1);
  };

  const refreshList = () => {
    setRefreshing(true);
    setLoading(true);
    setPage(1);
    setCheckins([]);
  };

  useEffect(() => {
    if (isFocused) {
      loadCheckins();
    }
  }, [isFocused, page]); // eslint-disable-line

  const handleCheckin = async () => {
    try {
      const { data } = await api.post(`students/${id}/checkins`);

      setCheckins([...checkins, data]);
    } catch (err) {
      Alert.alert(
        'Falha ao realizar o CheckIn',
        err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor'
      );
    }
  };

  return (
    <Background>
      <Container>
        <CheckinButton onPress={handleCheckin}>Novo check-in</CheckinButton>
        {loading && page === 1 ? (
          <ActivityIndicator color="#ee4e62" size={30} />
        ) : (
          <CheckinList
            data={checkins.sort((a, b) => b.id - a.id)}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => (
              <Checkin>
                <Left>{`Check-in #${totalCheckins - index}`}</Left>
                <Right>{item.timeDistance}</Right>
              </Checkin>
            )}
            refreshing={refreshing}
            onRefresh={refreshList}
            onEndReachedThreshold={0.05}
            onEndReached={debounce(loadMore, 500)}
          />
        )}
        {loading && page !== 1 && (
          <ActivityIndicator color="#ee4e62" size={30} />
        )}
      </Container>
    </Background>
  );
}

Checkins.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Checkins);
