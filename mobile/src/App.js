import React from 'react';
import { useSelector } from 'react-redux';
import { StatusBar } from 'react-native';

import createRouter from './routes';

export default function App() {
  const signed = useSelector(state => state.student.signed);

  const Routes = createRouter(signed);

  return (
    <>
      <StatusBar backgroundColor="#fff" />
      <Routes />
    </>
  );
}
StatusBar.setTranslucent(true);
StatusBar.setBarStyle('dark-content');
