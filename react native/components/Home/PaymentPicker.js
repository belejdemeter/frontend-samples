import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Picker, Icon} from 'native-base';
import {colors, shadow} from '../../styles/base';
import trans from 'GoTaxiApp/store/helpers/trans';

class PaymentPicker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.value == 'card' ? (
          <Image
            style={styles.card}
            source={require('../../assets/images/card-logo.png')}
          />
        ) : (
          <Icon
            type="FontAwesome5"
            name="money-bill"
            style={{fontSize: 20, color: colors.text}}
          />
        )}

        <Picker
          note
          selectedValue={this.props.value}
          iosHeader="Select value"
          mode="dialog"
          placeholder="Select value"
          onValueChange={this.props.onChange}
          style={{height: 50, color: colors.text}}>
          <Picker.Item
            label={trans('taxi.payment_cash', null, 'Cash')}
            value="cash"
          />
          <Picker.Item
            label={trans('taxi.payment_gocard', null, 'GO CARD')}
            value="card"
          />
        </Picker>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    ...shadow,
  },
  card: {
    width: 20,
    height: 20,
  },
});
export default PaymentPicker;
