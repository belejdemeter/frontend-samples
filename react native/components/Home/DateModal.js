import React, {Component} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {Text, Button, Icon} from 'native-base';
import TimePicker from '../TimePicker';
import trans from 'GoTaxiApp/store/helpers/trans';
import Modal from 'react-native-modal';
class DateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {date: null};
  }
  confirm = () => {
    this.props.setDate(this.state.date);
    this.props.closeModal();
  };
  clear = () => {
    this.props.setDate(null);
    this.props.closeModal();
  };
  render() {
    return (
      <Modal
        styles={styles.container}
        isVisible={this.props.visible}
        onBackdropPress={this.props.closeModal}
        transparent={true}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{margin: 0}}
        onRequestClose={this.props.closeModal}>
        <View style={styles.container}>
          {/* <TouchableWithoutFeedback onPressOut={this.props.closeModal}>
            <View style={styles.bg} />
          </TouchableWithoutFeedback> */}
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>
                {trans(
                  'taxi.datepicker_title',
                  null,
                  'Select your pickup time',
                )}
              </Text>
              <Button small transparent onPress={this.clear}>
                <Text>{trans('taxi.datepicker_clear', null, 'Clear')}</Text>
              </Button>
            </View>
            <TimePicker
              date={this.props.date}
              handleDateChange={date => this.setState({date})}
            />
            <Button rounded block onPress={this.confirm}>
              <Text>
                {trans('taxi.datepicker_confirm', null, 'Confirm pickup time')}
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1,
  },
  bg: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  content: {
    height: 230,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,

    padding: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: '100%',
    bottom: 0,
    position: 'absolute',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
});
export default DateModal;
