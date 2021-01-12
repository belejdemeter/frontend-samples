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
import {color} from 'react-native-reanimated';
class RideDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    let ride = _.get(props.route, 'params.ride', {});
    this.ride = ride;
  }

  render() {
    let date = moment(this.ride.scheduled_at);
    let day = date.format('DD');
    let monthName = date.format('MMMM');
    let dayName = date.format('dddd');
    let time = date.format('HH:mm');
    let from = this.ride.route[0].display_name;
    let to = this.ride.route[this.ride.route.length - 1].display_name;
    let cost = this.ride.estimate_fare;
    let duration = Math.round(this.ride.estimate_duration / 60);

    return (
      <Content padder contentContainerStyle={styles.container}>
        <InfoBlock
          data={[
            {title: day, subtitle: monthName},
            {title: time, subtitle: dayName},
          ]}
        />
        <Point subtitle="From:" title={from} />
        <View style={styles.divider} />
        <Point subtitle="To:" title={to} />
        <View>
          <InfoBlock
            size={20}
            data={[
              {
                title: `${cost} IQD`,
                subtitle: trans(
                  'taxi.sheduled_estimated_cost',
                  null,
                  'Estimated',
                ),
              },
              {
                title: `${duration} min`,
                subtitle: trans(
                  'taxi.sheduled_estimated_duration',
                  null,
                  'Duration',
                ),
              },
            ]}
          />
        </View>
      </Content>
    );
  }
}
function Point(props) {
  return (
    <View style={styles.point}>
      <View style={styles.pointIconContainer}>
        <View style={styles.pointIcon} />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.pointSubtitle}>{props.subtitle}</Text>
        <Text style={styles.pointTitle}>{props.title}</Text>
      </View>
    </View>
  );
}
function InfoBlock(props) {
  let size = props.size || 30;
  return (
    <View style={styles.info}>
      {props.data.map(item => (
        <View>
          <Text style={[styles.infoTitle, {fontSize: size}]}>{item.title}</Text>
          <Text style={[styles.infoSubtitle, {fontSize: size / 2}]}>
            {item.subtitle}
          </Text>
        </View>
      ))}
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
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.third,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    padding: 10,
  },
  infoTitle: {
    textAlign: 'center',
    fontSize: 30,
    color: colors.text,
  },
  infoSubtitle: {
    color: colors.text,
    textAlign: 'center',
  },
  point: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  pointIconContainer: {
    width: '10%',
  },
  pointIcon: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: colors.primary,
  },
  pointSubtitle: {color: colors.text, fontSize: 13},
  pointTitle: {color: colors.dark, fontSize: 15},
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.third,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RideDetailScreen);
