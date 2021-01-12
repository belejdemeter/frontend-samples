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
  Right,
  Button,
  Form,
  Tab,
  Tabs,
} from 'native-base';
import {StyleSheet, View} from 'react-native';
import {colors, shadow, isRTL} from '../styles/base';
import {connect} from 'react-redux';
import _ from 'lodash';
import Loader from '../components/Loader';
import {fetch, fetchSheduled} from '../store/actions/order';
import trans from 'GoTaxiApp/store/helpers/trans';
import RideList from '../components/Ride/RideList';
import ScreenLoader from '../components/ScreenLoader';
import SheduledList from '../components/Ride/SheduledList';
class RidesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetch();
    this.props.fetchSheduled();
  }
  toRide = ride => {
    const {navigate} = this.props.navigation;
    navigate('RideDetail', {ride});
  };
  toSheduled = ride => {
    const {navigate} = this.props.navigation;
    navigate('SheduledRide', {ride});
  };
  toHome = () => {
    const {navigate} = this.props.navigation;
    navigate('HomeStack');
  };
  render() {
    let isList = this.props.history.length > 0;
    return (
      <View style={styles.container}>
        <Tabs
          tabBarUnderlineStyle={styles.underline}
          locked
          prerenderingSiblingsNumber={2}>
          <Tab
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.textStyle}
            activeTextStyle={styles.activeTextStyle}
            heading={
              isRTL
                ? trans('taxi.sheduled_title', null, 'Scheduled Rides')
                : trans('taxi.history_title', null, 'History')
            }>
            <ScreenLoader enabled={this.props.isLoading && !isList} />
            <RideList
              data={this.props.history}
              toRide={this.toRide}
              toHome={this.toHome}
              onReachEnd={this.props.fetch}
              isLoading={this.props.isLoading}
            />
          </Tab>
          <Tab
            heading={
              isRTL
                ? trans('taxi.history_title', null, 'History')
                : trans('taxi.sheduled_title', null, 'Scheduled Rides')
            }
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activeTabStyle}
            textStyle={styles.textStyle}
            activeTextStyle={styles.activeTextStyle}>
            <ScreenLoader enabled={this.props.isLoading} />

            <SheduledList
              data={this.props.sheduled}
              toRide={this.toSheduled}
              toHome={this.toHome}
            />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.order.isLoading,
    history: state.order.history,
    sheduled: state.order.sheduled,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetch: () => dispatch(fetch()),
    fetchSheduled: () => dispatch(fetchSheduled()),
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 15,
  },
  underline: {
    backgroundColor: colors.primary,
  },
  tabStyle: {
    backgroundColor: '#fff',
  },
  activeTabStyle: {backgroundColor: '#fff'},
  textStyle: {color: colors.dark},
  activeTextStyle: {color: colors.primary},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RidesScreen);
