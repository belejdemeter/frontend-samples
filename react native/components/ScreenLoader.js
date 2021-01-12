import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Spinner} from 'native-base';
import {colors, dimensions} from 'GoTaxiApp/styles/base';
export default class ScreenLoader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.enabled) return null;
    return (
      <View style={styles.loader}>
        <Spinner color={colors.primary} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loader: {
    height: dimensions.fullHeight,
    width: dimensions.fullWidth,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 3000,
    elevation: 2,
  },
});
