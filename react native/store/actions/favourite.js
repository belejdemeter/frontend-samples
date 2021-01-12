import store from '../index';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import favourite from '../reducers/favourite';
import {fetchActive} from './order';

function setLoading(status) {
  return {
    type: 'FAVOURITE_SET_LOADING',
    status,
  };
}
function setFavouritesList(list) {
  return {
    type: 'FAVOURITE_SET_LIST',
    list,
  };
}
export function clear() {
  return {
    type: 'FAVOURITE_CLEAR',
  };
}
export function deleteFavourite(name) {
  return dispatch => {
    dispatch(setLoading(true));
    return AsyncStorage.getItem('favourites').then(data => {
      let result = JSON.parse(data);
      if (!result) result = [];
      result = result.filter(item => item.name != name);
      let favourites = JSON.stringify(result);
      dispatch(setLoading(false));

      return AsyncStorage.setItem('favourites', favourites).then(() => {
        dispatch(fetchFavourite());
      });
    });
  };
}
export function saveToFavourite(name, place) {
  return dispatch => {
    dispatch(setLoading(true));
    return AsyncStorage.getItem('favourites').then(data => {
      let result = JSON.parse(data);
      if (!result) result = [];
      result.push({name, place});
      let favourites = JSON.stringify(result);
      dispatch(setLoading(false));

      return AsyncStorage.setItem('favourites', favourites).then(() => {
        dispatch(fetchFavourite());
      });
    });
  };
}
export function fetchFavourite() {
  return dispatch => {
    dispatch(setLoading(true));
    return AsyncStorage.getItem('favourites').then(data => {
      let result = JSON.parse(data);

      dispatch(setFavouritesList(result));
      dispatch(setLoading(false));
    });
  };
}
