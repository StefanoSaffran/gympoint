import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
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
  const [loadingMore, setLoadingMore] = useState(false);
  const id = useSelector(state => state.student.profile.student.id);

  const loadCheckins = async () => {
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
    setLoading(false);
    setLoadingMore(false);
  };

  const loadMore = () => {
    if (page === totalPages) return;

    setLoadingMore(true);
    setPage(page + 1);
  };

  useEffect(() => {
    if (isFocused) {
      loadCheckins();
    }
  }, [isFocused, page]); // eslint-disable-line

  const handleCheckin = async () => {
    try {
      await api.post(`students/${id}/checkins`);

      if (page === 1) return loadCheckins();

      setPage(1);
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
        {loading ? (
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
            onEndReachedThreshold={0.2}
            onEndReached={loadMore}
          />
        )}
        {loadingMore && <ActivityIndicator color="#ee4e62" size={30} />}
      </Container>
    </Background>
  );
}

Checkins.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Checkins);
