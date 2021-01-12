import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Picker} from 'native-base';
import {Marker} from 'react-native-maps';
const pickupMarker = require('../../assets/images/marker_pickup.png');
const dropoffMarker = require('../../assets/images/marker.png');
const driverMarker = require('../../assets/images/car-icon.png');
const userMarker = require('../../assets/images/user_marker.png');

export default class LocationMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {type, lat, lon} = this.props;
    let markerType = pickupMarker;

    switch (type) {
      case 'dropoff':
        markerType = dropoffMarker;
        break;

      case 'user':
        markerType = userMarker;
        break;
      case 'driver':
        markerType = driverMarker;
        break;
      default:
        break;
    }
    const latlan = {
      latitude: lat,
      longitude: lon,
    };

    return (
      <Marker
        tracksViewChanges={false}
        icon={markerType}
        coordinate={latlan}
        anchor={type != 'driver' ? {x: 0.5, y: 1.5} : null}
      />
    );
  }
}
