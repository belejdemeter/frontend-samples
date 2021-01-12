import React, {Component} from 'react';
import {Content, Text, Button, Icon} from 'native-base';
import {View, StyleSheet} from 'react-native';
import * as RootNavigation from '../../navigation/RootNavigation.js';
import LinearGradient from 'react-native-linear-gradient';

class MapHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {title} = this.props;
    return (
      <View style={styles.mapHeader}>
        <View style={styles.headerContent}>
          <View style={{width: '10%'}}>
            <Button
              iconLeft
              dark
              transparent
              onPress={() => RootNavigation.toggleDrawer()}>
              <Icon type="FontAwesome" name={'bars'} fontSize="12" />
            </Button>
          </View>
          <View style={{width: '80%'}}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={{width: '10%'}} />
        </View>
        <LinearGradient
          locations={[0, 0.6]}
          colors={['#ffffff', 'transparent']}
          style={styles.topGradient}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    height: 60,

    alignItems: 'center',
    zIndex: 3,
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 20,
    textAlign: 'center',
  },
  headerCol: {
    width: '33%',
  },
  mapHeader: {
    height: 100,
    width: '100%',

    zIndex: 2,
    position: 'relative',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default MapHeader;
