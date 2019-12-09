import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './Pages/SignIn';

import Checkins from './Pages/CheckInsPage/Checkins';
import HelpOrders from './Pages/HelpOrdersPages/HelpOrders';
import Answer from './Pages/HelpOrdersPages/Answer';
import NewOrder from './Pages/HelpOrdersPages/NewOrder';

import Header from './components/Header';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({ SignIn }),
        App: createBottomTabNavigator(
          {
            CheckinsPage: {
              screen: createStackNavigator(
                {
                  Checkins,
                },
                {
                  headerLayoutPreset: 'center',
                  defaultNavigationOptions: {
                    header: <Header />,
                    headerStyle: {
                      backgroundColor: '#fff',
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Check-ins',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="beenhere" size={20} color={tintColor} />
                ),
              },
            },
            HelpOrdersPages: {
              screen: createStackNavigator(
                { HelpOrders, Answer, NewOrder },
                {
                  defaultNavigationOptions: navigation => ({
                    header: <Header {...navigation} />,
                    headerStyle: {
                      marginTop: 30,
                    },
                  }),
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#999',
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
