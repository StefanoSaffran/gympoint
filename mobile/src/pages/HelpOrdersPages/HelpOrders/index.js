import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import socketio from 'socket.io-client';

import api from '~/services/api';

import Background from '~/components/Background';
import Order from '~/components/Order';

import { Container, NewOrderButton, HelpOrderList } from './styles';

function HelpOrders({ navigation, isFocused }) {
  const [orders, setOrders] = useState([]);
  const id = useSelector(state => {
    return state.student.profile.student.id;
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
    });
  });

  const loadOrders = async () => {
    setOrders([]);
    const { data } = await api.get(`students/${id}/help-orders`);
    setOrders(data);
  };

  useEffect(() => {
    if (isFocused) {
      loadOrders();
    }
  }, [isFocused]); // eslint-disable-line

  return (
    <Background>
      <Container>
        <NewOrderButton onPress={() => navigation.navigate('NewOrder')}>
          Novo pedido de auxílio
        </NewOrderButton>
        <HelpOrderList
          data={orders.sort((a, b) => b.id - a.id)}
          keyExtractor={item => String(item.id)}
          renderItem={({ item: order }) => (
            <Order
              onClick={() => navigation.navigate('Answer', { order })}
              data={order}
            />
          )}
        />
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
