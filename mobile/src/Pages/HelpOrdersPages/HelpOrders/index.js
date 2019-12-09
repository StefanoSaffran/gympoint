import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import Order from '~/components/Order';

import { Container, NewOrderButton, HelpOrderList } from './styles';

function HelpOrders({ navigation, isFocused }) {
  const [orders, setOrders] = useState([]);
  const id = useSelector(state => state.student.id);

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

export default withNavigationFocus(HelpOrders);
