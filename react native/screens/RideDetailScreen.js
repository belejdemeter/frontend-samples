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
} from 'native-base';
import {StyleSheet, View} from 'react-native';
import {colors, shadow, isRTL} from '../styles/base';
import {connect} from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import Loader from '../components/Loader';
import trans from 'GoTaxiApp/store/helpers/trans';
class RideDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    let ride = _.get(props.route, 'params.ride', {});
    this.ride = ride;
  }

  renderDetail() {
    let pickup = this.ride.route[0].display_name;
    let dropoff = this.ride.route[this.ride.route.length - 1].display_name;
    let startTime = moment(this.ride.started_at).format('HH:mm');
    let endTime = moment(this.ride.completed_at).format('HH:mm');
    let driver = this.ride.worker.full_name;
    let plate = this.ride.worker.plate_number || '-';
    const detailArray = [
      {
        title: `${trans(
          'taxi.ride_pickup',
          null,
          'Pickup Location',
        )}\n${startTime}`,
        value: pickup,
      },
      {
        title: `${trans(
          'taxi.ride_dropoff',
          null,
          'Dropoff Location',
        )}\n${endTime}`,
        value: dropoff,
      },
      {
        title: trans('taxi.ride_driver', null, 'Driver'),
        value: `${driver} - ${trans(
          'taxi.ride_plate_number',
          null,
          'plate number',
        )}: ${plate}`,
      },
      {
        title: trans('taxi.ride_sum', null, 'Sum'),
        value: this.ride.total + ' ' + this.ride.currency,
      },
      {
        title: trans('taxi.ride_rate', null, 'Rate'),
        value: this.ride.rating || '-',
      },
    ];
    return detailArray.map(item => (
      <DetailRow title={item.title} value={item.value} />
    ));
  }
  render() {
    let date = moment(this.ride.created_at).format('MMMM MM');
    let dist = this.ride.distance / 1000;
    return (
      <Content padder style={styles.container}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.sumTitle}>
          {trans('taxi.ride_sum_title', null, 'Sum')}
        </Text>
        <Text style={styles.price}>
          {this.ride.total + ' ' + this.ride.currency}
        </Text>
        <Text style={styles.duration}>
          {dist.toFixed(2)} {trans('taxi.ride_km', null, 'km')} /{' '}
          {this.ride.duration
            ? this.ride.duration + ' ' + trans('taxi.ride_min', null, 'min')
            : '-'}
        </Text>
        <View style={styles.divider} />
        {this.renderDetail()}
      </Content>
    );
  }
}
function DetailRow(props) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailTitle}>{props.title}</Text>
      <Text style={styles.detailValue}>{props.value}</Text>
    </View>
  );
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  date: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.dark,
  },
  sumTitle: {
    textAlign: 'center',

    marginTop: 15,
    fontSize: 17,
  },
  price: {
    textAlign: 'center',
    color: colors.dark,
    marginVertical: 20,
    fontSize: 28,
  },
  duration: {
    fontSize: 15,

    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.dark,
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    marginVertical: 10,
  },
  detailTitle: {
    width: '50%',
    fontSize: 13,

    textAlign: 'left',
    color: colors.dark,
  },
  detailValue: {
    width: '50%',
    textAlign: 'right',
    fontSize: 13,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RideDetailScreen);
