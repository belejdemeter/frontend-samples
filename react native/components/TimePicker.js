import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import {colors} from '../styles/base';
import {WheelPicker} from 'react-native-wheel-picker-android';
import moment from 'moment';
import trans from 'GoTaxiApp/store/helpers/trans';
import 'moment/locale/ar';
import 'moment/locale/ku';
import _ from 'lodash';
import store from 'GoTaxiApp/store/index';
// const wheelPickerData = [
//   'sunday',
//   'monday',
//   'tuesday',
//   'wednesday',
//   'thursday',
//   'friday',
// ];

class TimePicker extends Component {
  constructor(props) {
    super(props);
    let locale = _.get(store.getState(), 'locale.locale');
    let currentDate = props.date;
    if (!currentDate) currentDate = moment(new Date());
    let hour = parseInt(moment(currentDate).format('HH'));
    let minute = parseInt(moment(currentDate).format('mm'));

    let initialDay = 0;
    this.days = [];
    this.hours = [];
    this.minutes = [];
    for (let i = 0; i < 25; i++) {
      this.hours.push(i.toString());
    }
    for (let i = 0; i < 60; i++) {
      this.minutes.push(i.toString());
    }
    for (let i = 0; i < 30; i++) {
      let day = moment().add(i, 'days');
      let isCurrent = day.format('DD') == moment(currentDate).format('DD');
      if (isCurrent) initialDay = i;
      if (i == 0) {
        this.days.push(trans('taxi.time_today', null, 'Today'));
        continue;
      }
      if (i == 1) {
        this.days.push(trans('taxi.time_tomorrow', null, 'Tomorrow'));
        continue;
      }
      let dayFormated = day.format('DD, ') + day.locale(locale).format('ddd');
      this.days.push(dayFormated);
    }

    this.state = {
      day: initialDay,
      hour,
      minute,
    };
  }

  onItemSelected = selectedItem => {
    this.setState({selectedItem});
  };
  _combineDate() {
    const {day, hour, minute} = this.state;
    let date = moment().add(day, 'days');
    date = moment(date).set({
      hour: this.hours[hour],
      minute: this.minutes[minute],
    });
    if (this.props.handleDateChange) this.props.handleDateChange(date);
  }
  onHourSelect = hour => {
    this.setState({hour}, () => this._combineDate());
  };
  onMinuteSelect = minute => {
    this.setState({minute}, () => this._combineDate());
  };
  onDateSelect = day => {
    this.setState({day}, () => this._combineDate());
  };
  render() {
    return (
      <View style={styles.container}>
        <WheelPicker
          isCyclic
          style={{width: '32%', marginRight: 3}}
          indicatorColor={colors.primary}
          indicatorWidth={3}
          selectedItem={this.state.day}
          data={this.days}
          onItemSelected={this.onDateSelect}
        />
        <WheelPicker
          isCyclic
          style={{width: '33%'}}
          indicatorColor={colors.primary}
          indicatorWidth={3}
          selectedItem={this.state.hour}
          data={this.hours}
          onItemSelected={this.onHourSelect}
        />
        <Text style={{height: 110, textAlignVertical: 'center'}}>:</Text>
        <WheelPicker
          isCyclic
          style={{width: '30%'}}
          indicatorColor={colors.primary}
          indicatorWidth={3}
          key={'minute'}
          selectedItem={this.state.minute}
          data={this.minutes}
          onItemSelected={this.onMinuteSelect}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
});
export default TimePicker;
