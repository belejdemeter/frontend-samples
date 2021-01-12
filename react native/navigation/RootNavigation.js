import * as React from 'react';

export const navigationRef = React.createRef();
import {
  StackActions,
  CommonActions,
  DrawerActions,
} from '@react-navigation/native';
export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
export function toggleDrawer() {
  navigationRef.current.dispatch(DrawerActions.toggleDrawer());
}
export function popToTop(name, params) {
  navigationRef.current.dispatch(StackActions.popToTop());
}
export function pop() {
  navigationRef.current.dispatch(StackActions.pop());
}
export function replace(name) {
  navigationRef.current.dispatch(StackActions.replace(name));
}
export function reset(route) {
  navigationRef.current.dispatch(
    CommonActions.reset({index: 0, routes: [{name: route}]}),
  );
}
export function getName() {
  return navigationRef.current.getCurrentRoute();
}
