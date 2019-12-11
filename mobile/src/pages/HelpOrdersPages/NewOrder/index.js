import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import api from '~/services/api';

import Background from '~/components/Background';
import { Container, OrderTextArea, SubmitButton } from './styles';

export default function NewOrder({ navigation }) {
  const [question, setQuestion] = useState('');
  const id = useSelector(state => state.student.id);

  const handleSubmit = async () => {
    try {
      await api.post(`students/${id}/help-orders`, { question });

      Alert.alert(
        'Pedido enviado',
        'Um instrutor entrará em contato em breve.'
      );

      setQuestion('');
    } catch (err) {
      Alert.alert('Falha ao realizar o pedido', err.response.data.error);
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
