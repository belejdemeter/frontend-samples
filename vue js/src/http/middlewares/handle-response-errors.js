import store from '../../store';
import _ from 'lodash';
import api from '../../api';
import axios from 'axios';
import trans from '../../trans';

import router from '@/router';
export default {
  type: 'response',
  error: (error) => {
    let status = _.get(error, 'response.status', null);
    let messages = _.get(error, 'response.data.errors', null);
    let data = _.get(error, 'response.data', null);
    let auth = store.state.auth.authenticated;
    console.log('error', error);

    if (status == 401 && auth == true) {
      store.dispatch('auth/refreshing');

      return api.user
        .refreshToken(localStorage.getItem('refresh_token'))
        .then((response) => {
          const config = error.config;
          store.dispatch('auth/refreshToken', response.data);
          config.headers[
            'Authorization'
          ] = `Bearer ${response.data.access_token}`;

          return new Promise((resolve, reject) => {
            return axios
              .request(config)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          });
        })
        .catch((error) => {
          store.dispatch('auth/logout');

          Promise.reject(error);
        });
    }
    if (status == 401) {
      store.dispatch('errors/put', {
        key: 'login',
        value: data,
      });
    }

    if (status == 403) {
      store.dispatch('errors/put', {
        key: 'error',
        value: 'You have no access to this page.',
      });
      return router.go(-1);
    }
    if (status == 404) {
      messages.forEach((item) => {
        store.dispatch('errors/put', {
          key: 'status',
          value: 404,
        });
      });
    }
    if (status == 422) {
      messages.forEach((item) => {
        store.dispatch('errors/put', {
          key: item.source.parameter,
          value: item.title,
        });
      });
    }

    if (status == 500) {
      store.dispatch('errors/put', {
        key: 'error',
        status: 500,
        value: trans(
          'marketplace.error_server',
          null,
          'We have a problem on our server. Please try again later.'
        ),
      });
    }

    if (messages != null) {
      store.dispatch('errors/fromResponse', error.response.data);
    }

    return Promise.reject(error);
  },
};
