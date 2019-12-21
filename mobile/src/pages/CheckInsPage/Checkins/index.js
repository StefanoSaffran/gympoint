import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { showMessage } from 'react-native-flash-message';

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
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const id = useSelector(state => state.student.profile.id);

  const loadCheckins = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`students/${id}/checkins`, {
        params: { page },
      });

      setTotalCheckins(data.count);
      setTotalPages(Math.ceil(data.count / 10));

      const formattedData = data.checkins.map(checkin => ({
        ...checkin,
        timeDistance: formatDistance(parseISO(checkin.createdAt), new Date(), {
          addSuffix: true,
          locale: pt,
        }),
      }));

      setCheckins(page > 1 ? [...checkins, ...formattedData] : formattedData);
    } catch (err) {
      showMessage({
        message: 'Falha buscar CheckIns',
        description: err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor',
        type: 'danger',
      });
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (page >= totalPages || loading) return;

    setPage(page + 1);
  };

  const refreshList = () => {
    setRefreshing(true);
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

      const formattedData = {
        ...data,
        timeDistance: formatDistance(parseISO(data.createdAt), new Date(), {
          addSuffix: true,
          locale: pt,
        }),
      };
      setTotalCheckins(totalCheckins + 1);

      setCheckins([...checkins, formattedData]);
    } catch (err) {
      showMessage({
        message: 'Falha ao realizar o CheckIn',
        description: err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor',
        type: 'info',
      });
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
            onEndReached={debounce(loadMore, 600)}
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
