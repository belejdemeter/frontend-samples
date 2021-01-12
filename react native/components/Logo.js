import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {colors} from 'GoTaxiApp/styles/base';
export default class Logo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const width = this.props.width || 100;
    return (
      <View style={{...styles.container, ...this.props.style}}>
        <AutoHeightImage
          width={width}
          source={require('../assets/images/go-bazar.png')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
});
