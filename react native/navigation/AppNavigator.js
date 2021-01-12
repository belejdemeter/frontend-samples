import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './RootNavigation.js';

import {NavigationContainer, useLinking} from '@react-navigation/native';
import Header from '../components/Header';
import DrawerNav from './DrawerNav';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import PasswordReset from '../screens/PasswordReset.js';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="HomeNavigator"
          component={DrawerNav}
          options={{
            headerShown: false,
            cardStyle: {backgroundColor: '#fff'},
          }}
        />

        <Stack.Screen
          name="Auth"
          component={SignIn}
          options={{
            header: () => <Header isLogo />,
            cardStyle: {backgroundColor: '#fff'},
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            header: () => <Header isLogo />,
            cardStyle: {backgroundColor: '#fff'},
          }}
        />
        <Stack.Screen
          name="RestorePassword"
          component={PasswordReset}
          options={{
            header: () => <Header isLogo />,
            cardStyle: {backgroundColor: '#fff'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       Main: MainTabNavigator,
//       Auth: SignIn,
//       AuthLoading: AuthLoadingScreen,
//     },
//     {initialRouteName: 'AuthLoading'},
//   ),
// );
