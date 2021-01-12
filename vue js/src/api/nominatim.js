import axiosCancel from 'axios-cancel';

import axios from 'axios';
import store from '../store';
import _ from 'lodash';
export default {
  locationByCoords(lat, lng) {
    return axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`
    );
  },
  searchByQuery(q) {
    return axios.get(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&addressdetails=1`
    );
  }
};
