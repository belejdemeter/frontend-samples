import {StyleSheet, Dimensions, Platform, I18nManager} from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};
export const isRTL = I18nManager.isRTL;
export const colors = {
  primary: '#FFECB3',
  primaryBlue: '#0b0953',

  secondary: '#fff',
  secondaryAccent: '#d2d8df',
  third: '#f4f5f6',
  dark: '#797a7c',

  text: '#7e859b',
  secondaryBg: '#F6F9FF',
  grayBg: '#F7F8FC',
  error: '#EF3B3A',
  success: '#28a745',
  border: '#E9EAEF',
  lightOrange: '#ffb087',
};

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  primary: 'Cochin',
};
export const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.3,
  shadowRadius: 1.41,

  elevation: 4,
};
export const checkboxStyle = {
  borderRadius: 50,
  marginRight: 20,
};

export const bottomShadow = {
  elevation: 2,
  shadowColor: Platform.OS == 'ios' ? '#000' : undefined,
  shadowOffset: Platform.OS == 'ios' ? {width: 0, height: 2} : undefined,
  shadowOpacity: Platform.OS == 'ios' ? 0.2 : undefined,
  shadowRadius: Platform.OS == 'ios' ? 1.2 : undefined,
};
export const glStyles = {
  centerBtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  linkText: {
    textTransform: 'capitalize',
  },
  link: {
    marginHorizontal: 5,
  },
};
