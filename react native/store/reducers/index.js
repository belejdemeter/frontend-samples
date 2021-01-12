import {combineReducers} from 'redux';
import {auth} from './auth';
import {errors} from './errors';
import {support} from './support';

import map from './map';
import user from './user';
import {locale} from './locale';
import distance from './distance';
import order from './order';
import search from './search';
import favourite from './favourite';
import drivers from './drivers';

export default combineReducers({
  auth,
  errors,
  map,
  user,
  locale,
  distance,
  order,
  search,
  support,
  favourite,
  drivers,
});
