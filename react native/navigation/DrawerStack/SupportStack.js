import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../../components/Header';
import Support from '../../screens/Support/Support';
import SupportChat from '../../screens/Support/SupportChat';

const Stack = createStackNavigator();
import trans from 'GoTaxiApp/store/helpers/trans';

export default function SupportStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Support"
        component={Support}
        options={{
          header: () => (
            <Header
              isDrawerBtn
              title={trans('taxi.header_title_support', null, 'Support')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="SupportChat"
        component={SupportChat}
        options={{
          header: () => (
            <Header
              isDrawerBtn
              title={trans('taxi.header_title_chat', null, 'Chat')}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
