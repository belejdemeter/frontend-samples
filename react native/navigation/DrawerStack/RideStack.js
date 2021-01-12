import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../../components/Header';
import RidesScreen from '../../screens/RidesScreen';
import RideDetailScreen from '../../screens/RideDetailScreen';

const Stack = createStackNavigator();
import trans from 'GoTaxiApp/store/helpers/trans';
import SheduledRideScreen from '../../screens/SheduledRideScreen';

export default function RideStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ride"
        component={RidesScreen}
        options={{
          header: () => (
            <Header
              isDrawerBtn
              flat
              title={trans('taxi.header_title_rides', null, 'Your Rides')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="RideDetail"
        component={RideDetailScreen}
        options={{
          header: () => (
            <Header
              flat
              isBackBtn
              title={trans(
                'taxi.header_title_ride_detail',
                null,
                'Ride Detail',
              )}
            />
          ),
        }}
      />
      <Stack.Screen
        name="SheduledRide"
        component={SheduledRideScreen}
        options={{
          header: () => (
            <Header
              flat
              isBackBtn
              title={trans('taxi.header_title_scheduled', null, 'Scheduled')}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
