import api from '../../api/map';
import _ from 'lodash';
function coordsToRouteConverter(coords) {
  let route = [];
  coords.forEach(position => {
    let point = position.longitude + ',' + position.latitude;

    route.push(point);
  });
  return route;
}
function setCurrentTaskRoute(route) {
  return {
    type: 'MAP_SET_CURRENT_TASK_ROUTE',
    route,
  };
}
function attemptingMap(status) {
  return {
    type: 'MAP_ATTEMPT',
    status,
  };
}
export function listToggle(isList) {
  return {
    type: 'MAP_LIST_TOGGLE',
    isList,
  };
}
function successRoute(route) {
  return {
    type: 'MAP_ROUTE_SUCCESS',
    route,
  };
}
export function clearRoutes() {
  return {
    type: 'MAP_CLEAR',
  };
}

export function buildRoutes(routes) {
  return dispatch => {
    dispatch(attemptingMap(true));
    let apiCalls = [];

    routes.forEach(route => {
      let promise = api
        .getRoute(route.points)
        .then(response => {
          const routeData = {
            path: response.data.routes[0].geometry,
            waypoints: response.data.waypoints,
            color: route.color,
          };
          dispatch(successRoute(routeData));
        })
        .catch(err => {
          console.log('err', err);
        });
      apiCalls.push(promise);
    });
    return Promise.all(apiCalls).then(value => {
      dispatch(attemptingMap(false));
    });
  };
}
export function buildRoute(points, key, isCurrentTask) {
  const route = coordsToRouteConverter(points);
  return dispatch => {
    dispatch(attemptingMap(true));
    return api
      .getRoute(route)
      .then(response => {
        const routeData = {
          path: response.data.routes[0].geometry,
          waypoints: response.data.waypoints,
          color: '#000',
          distance: _.get(response.data, 'routes[0].legs[0].distance', null),
          key,
        };

        dispatch(successRoute(routeData));
        if (isCurrentTask) {
          dispatch(setCurrentTaskRoute(routeData));
        }
        dispatch(attemptingMap(false));
      })
      .catch(err => {
        console.log('err', err);
        dispatch(attemptingMap(false));
      });
  };
}
export function setTaskPoint(point) {
  return {
    type: 'MAP_TASK_POINT',
    point,
  };
}
