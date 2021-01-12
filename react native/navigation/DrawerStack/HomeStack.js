import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from 'GoTaxiApp/screens/HomeScreen';

import Header from '../../components/Header';
import SearchScreen from '../../screens/SearchScreen';
import FavouriteSaveScreen from '../../screens/FavouriteSaveScreen';
import OrderProgressScreen from '../../screens/OrderProgressScreen';
import RateScreen from '../../screens/RateScreen';
import trans from 'GoTaxiApp/store/helpers/trans';
import SheduleOrderScreen from '../../screens/SheduleOrderScreen';

const Stack = createStackNavigator();
export default function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="OrderProgress"
        component={OrderProgressScreen}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Rate"
        component={RateScreen}
        options={{
          header: () => (
            <Header
              flat
              isDrawerBtn
              title={trans('taxi.header_title_rate', null, 'Rate Driver')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={({route}) => ({
          header: () => (
            <Header
              isBackBtn
              flat
              title={trans('taxi.header_title_search', null, 'Select Address')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="FavouriteSave"
        component={FavouriteSaveScreen}
        options={({route}) => ({
          header: () => (
            <Header
              isBackBtn
              flat
              title={trans(
                'taxi.header_title_save_address',
                null,
                'Save Address',
              )}
            />
          ),
        })}
      />
      <Stack.Screen
        name="SheduleOrder"
        component={SheduleOrderScreen}
        options={{
          header: () => (
            <Header
              flat
              title={trans(
                'taxi.header_title_shedule_order',
                null,
                'Scheduled Order',
              )}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
