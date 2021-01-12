import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, Icon} from 'native-base';
import {colors} from '../styles/base';
import store from 'GoTaxiApp/store/index';
import * as RootNavigation from 'GoTaxiApp/navigation/RootNavigation';
import {logout} from 'GoTaxiApp/store/actions/auth';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import _ from 'lodash';
import trans from 'GoTaxiApp/store/helpers/trans';
const routes = [
  {
    title: trans('taxi.nav_home', null, 'Home'),
    name: 'HomeStack',
    icon: ['fa', 'map'],
  },
  {
    title: trans('taxi.nav_rides', null, 'Your Rides'),
    name: 'RideStack',
    icon: ['fa', 'car'],
  },
  {
    title: trans('taxi.nav_settings', null, 'Settings'),
    name: 'ProfileStack',
    icon: ['fa', 'cog'],
  },
  {
    title: trans('taxi.nav_support', null, 'Support'),
    name: 'SupportStack',
    icon: ['fa', 'question'],
  },
];
function renderDrawerItems(items, currentRoute, navigation) {
  return items.map(item => {
    return (
      <CustomDrawerItem
        label={item.title}
        icon={item.icon}
        focused={currentRoute == item.name}
        navigate={() => navigation.navigate(item.name)}
      />
    );
  });
}
export default function CustomDrawerContent(props) {
  const {navigation} = props;
  const user = store.getState().user.data;
  const phone = _.get(user, 'phone_number', null);
  const name = user ? user.first_name + ' ' + user.last_name : '';
  const currRoute = _.last(
    _.filter(props.state.history, item => item.type != 'drawer'),
  );
  const currRouteName = props.state.routes.find(
    item => item.key == currRoute.key,
  );

  return (
    <View style={{flex: 1}}>
      <View>
        <Text style={styles.user}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
      <View style={styles.divider} />
      <DrawerContentScrollView {...props}>
        {renderDrawerItems(routes, currRouteName.name, navigation)}
      </DrawerContentScrollView>
      <View style={styles.divider} />
      <Button
        transparent
        full
        iconLeft
        style={{marginTop: 'auto'}}
        onPress={() => store.dispatch(logout())}>
        <Icon
          type="FontAwesome5"
          name="power-off"
          style={{fontSize: 12, color: colors.text}}
        />
        <Text style={{color: colors.text}}>
          {trans('taxi.nav_logout', null, 'Logout')}
        </Text>
      </Button>
    </View>
  );
}
function CustomDrawerItem(props) {
  return (
    <DrawerItem
      focused={props.focused}
      activeTintColor={colors.primary}
      style={styles.item}
      labelStyle={styles.labelStyle}
      label={props.label}
      icon={() => (
        <FontAwesomeIcon
          icon={props.icon}
          color={props.focused ? colors.primary : colors.dark}
        />
      )}
      onPress={props.navigate}
    />
  );
}
const styles = StyleSheet.create({
  item: {marginLeft: 0, marginRight: 0},
  user: {
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  phone: {
    textAlign: 'center',
    fontSize: 15,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.third,
    marginVertical: 20,
  },
  labelStyle: {
    fontWeight: 'bold',
  },
});
