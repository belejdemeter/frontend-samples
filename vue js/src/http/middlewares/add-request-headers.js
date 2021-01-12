import store from '../../store';
import _ from 'lodash';

function getStartUrl(url) {
  let arr = url.split('/');
  if (arr.length <= 1) return null;
  return arr[1];
}
const noTokenUrls = ['page', 'collection', 'auth', 'navigation'];
export default {
  type: 'request',
  handler: (config) => {
    let locale = _.get(store.state, 'locale.locale', 'en');
    config.headers['Accept-Language'] = locale;
    let token = _.get(store.state, 'auth.token');
    const startUrl = getStartUrl(config.url);
    if (token && !noTokenUrls.includes(startUrl)) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
  },
};
