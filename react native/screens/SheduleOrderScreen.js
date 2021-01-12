import React, {Component} from 'react';
import {
  Content,
  Text,
  Icon,
  Item,
  Input,
  List,
  ListItem,
  Body,
  Button,
  Right,
} from 'native-base';
import {StyleSheet, View, Alert} from 'react-native';
import {colors, shadow} from '../styles/base';
import {connect} from 'react-redux';

import _ from 'lodash';
import {color} from 'react-native-reanimated';
import trans from 'GoTaxiApp/store/helpers/trans';

class SheduleOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  close = () => {
    this.props.navigation.replace('Home');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Icon
            type="FontAwesome5"
            name="taxi"
            style={{color: colors.primary, fontSize: 52}}
          />
          <Icon
            type="FontAwesome5"
            name="check-circle"
            style={styles.checkIcon}
          />
        </View>
        <Text style={styles.title}>
          {trans(
            'taxi.sheduled_order_success',
            null,
            'Sheduled trip successfully placed',
          )}
        </Text>
        <Button rounded small onPress={this.close}>
          <Text>{trans('taxi.sheduled_order_success_btn', null, 'Back')}</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  icon: {
    width: 150,
    height: 150,
    // borderWidth: 2,
    // borderColor: colors.primary,
    borderRadius: 100,
    ...shadow,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'relative',
  },
  checkIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#fff',
    color: colors.primary,

    // borderRadius: 50,
    // borderWidth: 2,
    // borderColor: colors.primary,
    // width: 40,
    // height: 40,
  },
});

export default SheduleOrderScreen;
