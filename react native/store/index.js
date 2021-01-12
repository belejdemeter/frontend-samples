import configureStore from './configureStore';
const initialState = {
  auth: {
    pending: false,
    authenticated: false,
    token: null,
    expires_at: null,
    user: null,
    errors: null,
    refresh_token: null,
  },
  errors: {
    errors: {},
  },
  map: {
    pending: false,
    routes: [],
    waypoints: [],
  },
};
export default configureStore(initialState);
