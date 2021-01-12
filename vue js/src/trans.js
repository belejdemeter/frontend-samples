import _ from 'lodash';
import store from './store';

const trans = function(str_var, args, fallback) {
  if (typeof str_var === 'undefined') {
    return 'undefined';
  }
  let valid_str = str_var.replace(/^([^.]*\.)(.*)$/, function(a, b, c) {
    return b + c.replace(/\./g, '_');
  });
  let value = _.get(store.state.locale.i18n, valid_str, fallback || valid_str);
  _.eachRight(args, (param_val, param_key) => {
    value = _.replace(value, `:${param_key}`, param_val);
  });
  return value;
};

export default trans;
