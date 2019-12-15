import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import Checkins from '~/pages/CheckInsPage/Checkins';
import HelpOrders from '~/pages/HelpOrdersPages/HelpOrders';
import Answer from '~/pages/HelpOrdersPages/Answer';
import NewOrder from '~/pages/HelpOrdersPages/NewOrder';
import Profile from '~/pages/ProfilePage/Profile';

import Header from '~/components/Header';

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
            ProfilePage: {
              screen: createStackNavigator(
                {
                  Profile,
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
                tabBarLabel: 'Profile',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="person" size={20} color={tintColor} />
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
