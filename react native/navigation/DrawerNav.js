import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Stacks from './DrawerStack';
import CustomDrawerContent from './CustomDrawer';
const Drawer = createDrawerNavigator();

function DrawerContainer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeStack" component={Stacks.HomeStack} />
      <Drawer.Screen name="RideStack" component={Stacks.RideStack} />

      <Drawer.Screen name="ProfileStack" component={Stacks.ProfileStack} />
      <Drawer.Screen name="SupportStack" component={Stacks.SupportStack} />
    </Drawer.Navigator>
  );
}

export default DrawerContainer;
