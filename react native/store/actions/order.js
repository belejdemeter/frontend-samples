import nominantim from '../../api/nominantim';
import store from '../index';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import osrm from '../../api/map';
import api from '../../api/trip';
import * as RootNavigation from 'GoTaxiApp/navigation/RootNavigation';
import qs from 'qs';
import coordsToRoute from '../helpers/coordsToRoute';
import DistanceCalculator from '../helpers/DistanceCalculator';

// {dist: 2000, fix: 150, step: 0, extra: 0, modifier: 1.0, precision: 0},
//   {dist: 5000, fix: 150, step: 100, extra: 3, modifier: 1.0, precision: 0},
//   {dist: 7000, fix: 200, step: 100, extra: 3, modifier: 1.0, precision: 0},
//   {dist: 0, fix: 0, step: 0, extra: 0, modifier: 1.0, precision: 0.5},
function setLoading(status) {
  return {
    type: 'ORDER_SET_LOADING',
    status,
  };
}
export function setPickupLocation() {
  let location = _.get(store.getState(), 'order.current', null);
  return {
    type: 'ORDER_SET_PICKUP_LOCATION',
    location,
  };
}
export function setDropoffLocation() {
  let location = _.get(store.getState(), 'order.current', null);

  return {
    type: 'ORDER_SET_DROPOFF_LOCATION',
    location,
  };
}
export function setPointLocation() {
  let location = _.get(store.getState(), 'order.current', null);

  return {
    type: 'ORDER_SET_POINT_LOCATION',
    location,
  };
}
export function setCurrentLocation(location) {
  return {
    type: 'ORDER_SET_CURRENT_LOCATION',
    location,
  };
}
export function setPaymentMethod(payment) {
  return {
    type: 'ORDER_SET_PAYMENT_METHOD',
    payment,
  };
}
export function clearDropoff() {
  return {
    type: 'ORDER_CLEAR_DROPOFF',
  };
}
function setOrderData(order) {
  return {
    type: 'ORDER_SET_DATA',
    order,
  };
}
export function setSheduleDate(date) {
  return {
    type: 'ORDER_SET_SHEDULE',
    date,
  };
}
export function clearPickup() {
  return {
    type: 'ORDER_CLEAR_PICKUP',
  };
}
export function clearOrder() {
  AsyncStorage.removeItem('active_trip');

  return {
    type: 'ORDER_CLEAR',
  };
}
export function addPoint() {
  return {
    type: 'ORDER_ADD_POINT',
  };
}
export function removePoint(index) {
  return {
    type: 'ORDER_REMOVE_POINT',
    index,
  };
}
function setHistory(history, page, lastPage) {
  return {
    type: 'ORDER_SET_HISTORY',
    history,
    page,
    lastPage,
  };
}

export function fetchLocation(lat, lon) {
  return dispatch => {
    dispatch(setLoading(true));
    return nominantim
      .getByLocation(lat, lon)
      .then(({data}) => {
        dispatch(setLoading(false));
        dispatch(setCurrentLocation({...data, lat, lon}));
      })
      .catch(e => {
        console.log('Error', e);
        dispatch(setLoading(false));
      });
  };
}
function setEstimatedData(estimated) {
  return {
    type: 'ORDER_SET_ESTIMATED_DATA',
    estimated,
  };
}
function setSheduled(sheduled) {
  return {
    type: 'ORDER_SET_SHEDULED',
    sheduled,
  };
}
export function confirm() {
  return dispatch => {
    let dropoff = _.get(store.getState(), 'order.dropoff', null);
    let points = _.get(store.getState(), 'order.points', []);
    let pickup = _.get(store.getState(), 'order.pickup', null);
    let sheduleDate = _.get(store.getState(), 'order.sheduleDate', null);

    if (!dropoff || !pickup) return;
    dispatch(setLoading(true));
    let route = [pickup, ...points, dropoff];
    return api
      .store(route, sheduleDate)
      .then(({data}) => {
        dispatch(setOrderData(data));

        if (!!data.scheduled_at) {
          AsyncStorage.setItem('active_trip', data.uuid);
          RootNavigation.replace('OrderProgress');
        } else {
          dispatch(clearPickup());
          dispatch(clearDropoff());
          RootNavigation.replace('SheduleOrder');
        }
        dispatch(setLoading(false));
      })
      .catch(e => {
        console.log('e', e);
        dispatch(setLoading(false));
      });
  };
}
export function calculateEstimated() {
  let dropoff = _.get(store.getState(), 'order.dropoff', null);
  let points = _.get(store.getState(), 'order.points', []);
  let pickup = _.get(store.getState(), 'order.pickup', null);
  return dispatch => {
    if (!pickup) return;

    let route = [
      {lat: pickup.lat, lon: pickup.lon},
      ...points,
      {lat: dropoff.lat, lon: dropoff.lon},
    ];
    dispatch(setLoading(true));

    return api
      .create(qs.stringify({route}))
      .then(({data}) => {
        dispatch(setEstimatedData(data));
        dispatch(setLoading(false));
      })
      .catch(e => {
        console.log('e', e);
        dispatch(setLoading(false));
      });
  };
}
export function fetchActive(uuid) {
  return dispatch => {
    dispatch(setLoading(true));
    return api
      .show(uuid)
      .then(({data}) => {
        dispatch(setOrderData(data));
        let route = RootNavigation.getName();
        if (route.name != 'OrderProgress') {
          RootNavigation.replace('OrderProgress');
        }

        dispatch(setLoading(false));
      })
      .catch(e => {
        console.log('error', e);
        dispatch(setLoading(false));
      });
  };
}
export function checkActiveTrip() {
  return dispatch => {
    dispatch(setLoading(true));

    AsyncStorage.getItem('active_trip').then(result => {
      if (result) {
        dispatch(fetchActive(result));
      } else {
        dispatch(setLoading(false));
      }
    });
  };
}
export function rate(rating = null, review = null) {
  return dispatch => {
    let uuid = _.get(store.getState(), 'order.activeOrder.uuid', null);
    if (!uuid) return;
    dispatch(setLoading(true));

    return api
      .rate(uuid, rating, review)
      .then(response => {
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(setLoading(false));
        console.log('e', e);
      });
  };
}
export function fetch() {
  return dispatch => {
    let uuid = _.get(store.getState(), 'user.data.uuid');
    let page = _.get(store.getState(), 'order.page');
    let lastPage = _.get(store.getState(), 'order.lastPage');
    if (page == lastPage) return;
    dispatch(setLoading(true));
    let query = {
      subject: uuid,
      limit: 15,
      page: page + 1,
      state: ['completed', 'failed', 'canceled'],
    };
    return api
      .fetch(query)
      .then(({data}) => {
        dispatch(setHistory(data.data, data.current_page, data.last_page));
        dispatch(setLoading(false));
      })
      .catch(e => {
        console.log('e', e);
        dispatch(setLoading(false));
      });
  };
}
export function fetchSheduled() {
  return dispatch => {
    let uuid = _.get(store.getState(), 'user.data.uuid');

    dispatch(setLoading(true));
    let query = {
      subject: uuid,
      limit: -1,
      state: ['unassigned', 'active'],
      order_by: 'scheduled_at',
    };
    return api
      .fetch(query)
      .then(({data}) => {
        dispatch(setSheduled(data.data));
        dispatch(setLoading(false));
      })
      .catch(e => {
        console.log('e', e);
        dispatch(setLoading(false));
      });
  };
}
export function cancel() {
  return dispatch => {
    let uuid = _.get(store.getState(), 'order.activeOrder.uuid', null);
    if (!uuid) return;
    dispatch(setLoading(true));

    return api
      .delete(uuid)
      .then(response => {
        dispatch(setLoading(false));
        dispatch(clearOrder());
      })
      .catch(e => {
        dispatch(setLoading(false));
        console.log('e', e);
      });
  };
}
