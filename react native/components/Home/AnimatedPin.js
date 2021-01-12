import React, {Component} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {colors} from '../../styles/base';
class AnimatedPin extends Component {
  constructor(props) {
    super(props);
    this.state = {animating: false};
    this.animatedValue = new Animated.Value(0);
  }

  componentDidUpdate() {
    if (!this.props.dragging) {
      this.handleAnimation();
    } else {
      this.handleReverseAnimation();
    }
  }
  handleAnimation = () => {
    if (this.state.animating) return;
    this.setState({animating: true});
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => this.setState({animating: false}));
  };
  handleReverseAnimation = () => {
    if (this.state.animating) return;

    this.setState({animating: true});
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => this.setState({animating: false}));
  };
  render() {
    return (
      <View style={styles.markerFixed}>
        <Animated.View
          style={{
            justifyContent: 'center',
            alignItems: 'center',

            transform: [
              {
                scale: this.animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
              {
                translateY: this.animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }),
              },
            ],
          }}>
          <View style={[styles.bigCircle]} />
          <View style={styles.line} />
        </Animated.View>

        <View style={styles.marker} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  markerFixed: {
    left: '50%',
    marginLeft: -17,
    marginTop: -50,
    position: 'absolute',
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  line: {
    width: 1,
    height: 10,
    backgroundColor: colors.primary,
  },
  bigCircle: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
export default AnimatedPin;
