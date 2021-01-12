import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from 'native-base';
import Polyline from '@mapbox/polyline';
import MapView, {Marker, Polyline as PolylineDraw} from 'react-native-maps';
export default class Route extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  buildRoutes(routes) {
    let currentRoutes = [];
    routes.forEach(route => {
      let points = Polyline.decode(route.path);

      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      currentRoutes.push({coords, color: route.color});
    });

    return currentRoutes;
  }
  buildRoute(route) {
    let points = Polyline.decode(route.path);

    let coords = points.map((point, index) => {
      return {
        latitude: point[0],
        longitude: point[1],
      };
    });

    return {coords, color: route.color};
  }
  generateMarkers(routes) {
    let markers = [];
    routes.forEach(route => {
      route.waypoints.forEach(waypoint => {
        markers.push({
          latlng: {
            longitude: waypoint.location[0],
            latitude: waypoint.location[1],
          },
          color: route.color,
          title: waypoint.name,
        });
      });
    });

    return markers;
  }
  renderMarkers(markers) {
    // if (this.props.loading) return null;
    // let markers = this.state.markers.slice();

    return markers.map((marker, index) => (
      <Marker
        key={index}
        title={marker.title}
        coordinate={marker.latlng}
        pinColor={marker.color}
      />
    ));
  }
  renderRoutes(routes) {
    // if (this.props.loading) return null;
    // let routes = this.state.routes.slice();

    return routes.map((route, index) => {
      return (
        <PolylineDraw
          key={index}
          coordinates={route.coords}
          strokeWidth={2}
          strokeColor={route.color}
          style={{zIndex: 2}}
        />
      );
    });
  }
  render() {
    const {route} = this.props;
    if (route) {
      const routeLine = this.buildRoute(route);
      return (
        <PolylineDraw
          key={'1'}
          coordinates={routeLine.coords}
          strokeWidth={2}
          strokeColor={routeLine.color}
          style={{zIndex: 2}}
        />
      );
    }
    let routes = this.buildRoutes(this.props.routes);
    let markers = this.generateMarkers(this.props.routes);
    return (
      <>
        {this.renderRoutes(routes)}
        {this.renderMarkers(markers)}
      </>
    );
  }
}
const styles = StyleSheet.create({});
