import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Icon, Button} from 'native-base';
import {colors, shadow, isRTL} from '../../styles/base';
import Loader from '../Loader';
import _ from 'lodash';
class AddressBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderPoints() {
    let points = this.props.points.slice();
    return points.map((point, index) => (
      <>
        <Divider />
        <Address
          location={point}
          isDeleteBtn
          removePoint={() => this.props.removePoint(index)}
          current={this.props.current}
          toSaveFavourite={location => this.props.toSaveFavourite(location)}
        />
      </>
    ));
  }
  render() {
    const {isLoading, pickup, dropoff, current} = this.props;
    let isPoints = !!pickup && this.props.points.length > 0;
    let isEmptyPoints =
      isPoints && !this.props.points[this.props.points.length - 1];
    if (isEmptyPoints) {
      return (
        <View style={styles.container}>
          {isLoading && <Loader />}
          <Address
            current={current}
            addPoint={this.props.addPoint}
            toSaveFavourite={location => this.props.toSaveFavourite(location)}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {isLoading && <Loader />}

        <Address
          location={pickup}
          current={current}
          isAddBtn={!!dropoff}
          addPoint={this.props.addPoint}
          toSaveFavourite={location => this.props.toSaveFavourite(location)}
          onPress={!!pickup ? this.props.clearPickup : this.props.toSearch}
        />
        {isPoints && this.renderPoints()}
        {!!pickup && (
          <>
            <Divider />
            <Address
              location={dropoff}
              current={!isEmptyPoints ? current : null}
              fill
              toSaveFavourite={location => this.props.toSaveFavourite(location)}
              onPress={this.props.clearDropoff}
            />
          </>
        )}
      </View>
    );
  }
}
function Divider() {
  return (
    <View style={styles.pointContainer}>
      <View style={styles.icon}>
        <View style={styles.line} />
      </View>
      <View style={styles.sectionContent}>
        <View style={styles.divider} />
      </View>
    </View>
  );
}
function Address(props) {
  return (
    <TouchableOpacity style={styles.pointContainer} onPress={props.onPress}>
      <View style={styles.icon}>
        <View style={props.fill ? styles.pointIconFill : styles.pointIcon} />
      </View>

      <View style={styles.sectionContent}>
        <LocationName
          location={!!props.location ? props.location : props.current}
        />
        {!props.location ? (
          <IconButton
            onPress={() => props.toSaveFavourite(props.current)}
            icon="heart"
          />
        ) : props.isAddBtn ? (
          <IconButton onPress={props.addPoint} icon="plus" />
        ) : null}
        {props.location && props.isDeleteBtn && (
          <IconButton onPress={props.removePoint} icon="times" />
        )}
      </View>
    </TouchableOpacity>
  );
}
function LocationName(props) {
  let name = _.get(props.location, 'name', null);
  let city = _.get(props.location, 'address.city', null);
  let displayName = _.get(props.location, 'display_name', null);

  return (
    <View style={{width: '90%'}}>
      <Text style={styles.title} numberOfLines={1}>
        {name ? name : city}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {displayName}
      </Text>
    </View>
  );
}
function IconButton(props) {
  return (
    <TouchableOpacity style={styles.iconBtnContainer} onPress={props.onPress}>
      <Icon style={styles.iconBtn} type="FontAwesome5" name={props.icon} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 8,
    ...shadow,
    borderRadius: 5,
    marginTop: -35,
    position: 'relative',
    // overflow: 'hidden',
  },
  title: {
    fontWeight: '500',
    fontSize: 14,
    width: '100%',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 13,
    color: colors.text,
    width: '100%',
    textAlign: isRTL ? 'right' : 'left',
  },
  pointContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  icon: {
    width: '10%',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  sectionContent: {
    width: '85%',

    alignItems: 'center',

    flexDirection: 'row',
  },

  line: {
    width: 2,
    height: 30,
    backgroundColor: colors.primary,
    marginVertical: 5,
    alignSelf: 'center',
  },
  pointIcon: {
    width: 15,
    height: 15,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 50,
  },
  pointIconFill: {
    width: 15,
    height: 15,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 50,
  },
  divider: {
    height: 2,
    flex: 1,
    backgroundColor: colors.secondaryAccent,
  },
  iconBtnContainer: {
    width: '15%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  // addPoint: {
  //   width: '30%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  // },
  addIcon: {
    color: colors.primary,
    fontSize: 17,
  },
  iconBtn: {
    fontSize: 17,
    color: colors.text,
  },
});
export default AddressBlock;
