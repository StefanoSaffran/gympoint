import React, { useState, useEffect, useMemo } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import socketio from 'socket.io-client';
import debounce from 'lodash.debounce';

import api from '~/services/api';

import Background from '~/components/Background';
import Order from '~/components/Order';

import { Container, NewOrderButton, HelpOrderList } from './styles';

function HelpOrders({ navigation, isFocused }) {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const id = useSelector(state => {
    return state.student.profile.id;
  });

  const socket = useMemo(
    () =>
      socketio('http://10.0.2.2:3003', {
        query: {
          user_id: id,
          origin: 'mobile',
        },
      }),
    [id]
  );

  useEffect(() => {
    socket.on('order_response', order => {
      setOrders(
        orders.map(o => {
          return o.id !== order.id ? o : order;
        })
      );
      Alert.alert('Uma nova mensagem', 'Seu pedido foi respondido');
    });
  });

  const loadOrders = async () => {
    try {
      const { data } = await api.get(`students/${id}/help-orders`, {
        params: { page },
      });

      setOrders(page > 1 ? [...orders, ...data.orders] : data.orders);
      setTotalPages(Math.ceil(data.count / 5));
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
    console.tron.log(page, totalPages, loading, refreshing);
    if (page === totalPages || loading) return;

    setLoading(true);
    setPage(page + 1);
  };

  const refreshList = () => {
    setRefreshing(true);
    setLoading(true);
    setPage(1);
    setOrders([]);
  };

  useEffect(() => {
    if (isFocused) {
      loadOrders();
    }
  }, [isFocused, page]); // eslint-disable-line

  return (
    <Background>
      <Container>
        <NewOrderButton onPress={() => navigation.navigate('NewOrder')}>
          Novo pedido de auxílio
        </NewOrderButton>
        {loading && page === 1 ? (
          <ActivityIndicator color="#ee4e62" size={30} />
        ) : (
          <HelpOrderList
            data={orders.sort((a, b) => b.id - a.id)}
            keyExtractor={item => String(item.id)}
            renderItem={({ item: order }) => (
              <Order
                onClick={() => navigation.navigate('Answer', { order })}
                data={order}
              />
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

HelpOrders.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(HelpOrders);
