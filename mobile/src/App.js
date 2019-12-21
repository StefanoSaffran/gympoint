import React from 'react';
import { useSelector } from 'react-redux';
import { StatusBar, YellowBox } from 'react-native';
import FlashMessage from 'react-native-flash-message';

import createRouter from './routes';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

export default function App() {
  const signed = useSelector(state => state.student.signed);

  const Routes = createRouter(signed);

  return (
    <>
      <StatusBar backgroundColor="#fff" />
      <Routes />
      <FlashMessage icon="auto" duration={3000} style={{ marginTop: 25 }} />
    </>
  );
}
StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');
