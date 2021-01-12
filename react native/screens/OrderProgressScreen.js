import React, {Component} from 'react';
import {Content, Text, Button, Icon, Spinner} from 'native-base';
import Map from '../components/Map';
import {View, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapHeader from '../components/Home/MapHeader';
import AddressBlock from '../components/Home/AddressBlock';
import {connect} from 'react-redux';
import {clearOrder, checkActiveTrip, cancel} from '../store/actions/order';
import LocationMarker from '../components/Map/LocationMarker';
import {colors, shadow} from '../styles/base';
import DriverInfo from '../components/DriverInfo';
import OrderDetail from '../components/OrderProgress.js/OrderDetail';
import CancelModal from '../components/OrderProgress.js/CancelModal';
import RideEndModal from '../components/OrderProgress.js/RideEndModal';
import trans from 'GoTaxiApp/store/helpers/trans';
import _ from 'lodash';
import DriversPosition from '../components/Home/DriversPosition';
class OrderProgressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {isCancelModal: false, isEndModal: false, isDriver: false};
  }
  componentDidMount() {
    const {route} = this.props;
    if (route.length > 0 && this.map) {
      let points = [];
      for (let i = 0; i < route.length; i++) {
        const point = route[i];
        points.push({
          latitude: parseFloat(point.lat),
          longitude: parseFloat(point.lon),
        });
      }

      setTimeout(() => this.map.fitToMarkers(points), 10);
    }

    // if (!this.props.isDriver && !this.interval) {
    //   this.interval = setInterval(() => {
    //     this.props.checkActiveTrip();
    //   }, 5000);
    // } else {
    //   clearInterval(this.interval);
    // }
  }
  componentWillUnmount() {
    // clearInterval(this.interval);
  }
  closeCancelModal = () => this.setState({isCancelModal: false});
  openCancelModal = () => this.setState({isCancelModal: true});
  closeEndModal = () => this.setState({isEndModal: false});
  openEndModal = () => this.setState({isEndModal: true});
  toHome = () => {
    this.closeEndModal();
    this.props.clearOrder();
    const {replace} = this.props.navigation;
    replace('Home');
  };
  toRate = () => {
    this.closeEndModal();
    const {replace} = this.props.navigation;
    replace('Rate');
  };
  renderPoints() {
    const route = this.props.route.slice();
    let points = [];
    for (let i = 0; i < route.length; i++) {
      const point = route[i];
      points.push(
        <LocationMarker
          key={i}
          type={i > 0 ? 'dropoff' : 'user'}
          lat={parseFloat(point.lat)}
          lon={parseFloat(point.lon)}
        />,
      );
    }
    return points;
  }
  cancel = () => {
    this.props.cancelOrder().then(() => {
      const {replace} = this.props.navigation;
      replace('Home');
    });
  };
  render() {
    const {isLoading, route, worker, isDriver} = this.props;
    let pickup = route[0];
    let dropoff = route[route.length - 1];
    if (!pickup && !dropoff) return <View />;
    return (
      <View style={styles.container}>
        <CancelModal
          confirm={this.cancel}
          visible={this.state.isCancelModal}
          closeModal={this.closeCancelModal}
        />
        <RideEndModal
          visible={this.props.isCompleted}
          closeModal={this.closeEndModal}
          onAccept={this.toRate}
          onDecline={this.toHome}
        />
        <View style={styles.mapContainer}>
          <MapHeader
            title={
              isDriver
                ? trans('taxi.progress_driver_wait', null, 'Driver is on a way')
                : trans(
                    'taxi.progress_driver_looking',
                    null,
                    'Looking for a driver',
                  )
            }
          />

          <View style={styles.map}>
            <Map ref={ref => (this.map = ref)}>
              {this.renderPoints()}
              {!isDriver && <DriversPosition drivers={this.props.drivers} />}
            </Map>
          </View>
          <View style={styles.mapFooter}>
            {isDriver ? (
              <>
                <DriverInfo {...worker} />
                <View style={styles.divider} />
                <OrderDetail
                  pickup={pickup.display_name}
                  dropoff={dropoff.display_name}
                />
              </>
            ) : (
              <>
                <Spinner />
                <Text style={styles.placeholderText}>
                  {trans(
                    'taxi.progress_driver_search_placeholder',
                    null,
                    'Looking for a driver...',
                  )}
                </Text>
              </>
            )}
            {!isDriver && (
              <Button
                rounded
                bordered
                small
                style={{
                  alignSelf: 'flex-end',
                  marginTop: 'auto',
                  marginBottom: 10,
                }}
                onPress={this.openCancelModal}>
                <Text>{trans('taxi.progress_cancel_btn', null, 'Cancel')}</Text>
              </Button>
            )}
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoading: state.order.isLoading,
    current: state.order.current,
    route: _.get(state.order, 'activeOrder.route', []),

    payment: state.order.payment,
    worker: _.get(state.order, 'activeOrder.worker', {}),
    isDriver: _.get(state.order, 'activeOrder.state', null) != 'unassigned',
    isCompleted: _.get(state.order, 'activeOrder.state', null) == 'completed',
    drivers: state.drivers.positions,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearOrder: () => dispatch(clearOrder()),
    checkActiveTrip: () => dispatch(checkActiveTrip()),
    cancelOrder: () => dispatch(cancel()),
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,

    position: 'relative',
  },
  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 250,
  },

  mapFooter: {
    marginTop: 'auto',
    backgroundColor: '#fff',
    width: '100%',
    zIndex: 2,
    borderRadius: 20,
    ...shadow,
    padding: 10,
    marginBottom: -10,
    height: 270,
  },

  divider: {
    width: '100%',
    marginVertical: 10,
    height: 1,
    backgroundColor: colors.secondaryAccent,
  },
  placeholderText: {
    textAlign: 'center',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderProgressScreen);
