import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LocationMarker from '../Map/LocationMarker';
export default function DriversPosition(props) {
  let postitions = props.drivers.slice();
  return postitions.map((pos, index) => {
    return (
      <LocationMarker key={index} type="driver" lat={pos.lat} lon={pos.lon} />
    );
  });
}
