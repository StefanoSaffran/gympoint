import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { showMessage } from 'react-native-flash-message';

import api from '~/services/api';

import Background from '~/components/Background';
import { Container, OrderTextArea, SubmitButton } from './styles';

export default function NewOrder({ navigation }) {
  const [question, setQuestion] = useState('');
  const id = useSelector(state => state.student.profile.id);

  const handleSubmit = async () => {
    try {
      await api.post(`students/${id}/help-orders`, { question });

      showMessage({
        message: 'Pedido enviado',
        description: 'Um instrutor entrará em contato em breve.',
        type: 'info',
      });

      setQuestion('');
      navigation.navigate('HelpOrders');
    } catch (err) {
      showMessage({
        message: 'Falha ao realizar o pedido',
        description: err.response
          ? err.response.data.error
          : 'Erro de conexão com o servidor',
        type: 'danger',
      });
    }
  };

  return (
    <Background>
      <Container>
        <OrderTextArea
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          placeholder="Inclua seu pedido de auxílio"
          autoCorrect={false}
          multiline
          auto
          numberOfLines={9}
          returnKeyType="send"
          value={question}
          onChangeText={setQuestion}
        />
        <SubmitButton onPress={handleSubmit}>Enviar pedido</SubmitButton>
      </Container>
    </Background>
  );
}

NewOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
