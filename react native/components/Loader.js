import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Spinner} from 'native-base';
import {colors, dimensions} from 'GoTaxiApp/styles/base';
export default class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.loader}>
        <Spinner color={colors.primary} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loader: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 3000,
    elevation: 2,
  },
});
