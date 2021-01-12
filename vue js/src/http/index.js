'use strict';

import _ from 'lodash';
import axios from 'axios';
import axiosCancel from 'axios-cancel';
import store from '../store';
import router from '../router';
import middlewares from './middlewares';
import qs from 'qs';
import objectToFormData from 'object-to-formdata';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

//'https://userservice.digitaloceanapi.com/'
export default function initHttp(baseUrl) {
  const client = axios.create({
    baseURL: baseUrl
  });

  axiosCancel(client, {
    debug: false
  });



  _.each(middlewares, middleware => {
    let type = middleware.type;
    let fulfilled = _.get(middleware, 'handler', r => r);
    let rejected = _.get(middleware, 'error', r => r);

    fulfilled.bind({ axios: client });
    rejected.bind({ axios: client });

    client.interceptors[type].handlers.push({ fulfilled, rejected });
  });

  const serializeQuery = function(query_params) {
    return {
      params: query_params,
      paramsSerializer: function(params) {
        return qs.stringify(params, {
          arrayFormat: 'indices',
          encode: false
        });
      }
    };
  };

  const convertToFormdata = function(json_data) {
    return objectToFormData(json_data, { indices: true });
  };

  const wrapper = {
    get: (url, params = null) => {
      return client.get(url, serializeQuery(params));
    },
    post: (url, payload = null) => {
      return client.post(url, convertToFormdata(payload));
    },
    put: (url, payload = null) => {
      return client.put(url, convertToFormdata(payload));
    },
    patch: (url, payload = null) => {
      return client.patch(url, convertToFormdata(payload));
    },
    delete: (url, payload = null) => {
      return client.delete(url, convertToFormdata(payload));
    }
  };
  return wrapper;
}
