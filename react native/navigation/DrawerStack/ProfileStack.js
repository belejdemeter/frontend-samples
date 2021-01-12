import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../../components/Header';
import ProfileScreen from '../../screens/ProfileScreen';
import LanguageSelect from '../../screens/LanguageSelect';

const Stack = createStackNavigator();
import trans from 'GoTaxiApp/store/helpers/trans';

export default function Profile() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Rate"
        component={ProfileScreen}
        options={{
          header: () => (
            <Header
              isDrawerBtn
              title={trans('taxi.header_title_settings', null, 'Settings')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="LanguageSelect"
        component={LanguageSelect}
        options={{
          header: () => (
            <Header
              isDrawerBtn
              title={trans(
                'taxi.header_title_language',
                null,
                'Select Language',
              )}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
