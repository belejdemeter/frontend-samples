const ORDER_SET_LOADING = 'ORDER_SET_LOADING';
const ORDER_SET_PICKUP_LOCATION = 'ORDER_SET_PICKUP_LOCATION';
const ORDER_SET_DROPOFF_LOCATION = 'ORDER_SET_DROPOFF_LOCATION';
const ORDER_SET_CURRENT_LOCATION = 'ORDER_SET_CURRENT_LOCATION';
const ORDER_SET_PAYMENT_METHOD = 'ORDER_SET_PAYMENT_METHOD';
const ORDER_CLEAR_PICKUP = 'ORDER_CLEAR_PICKUP';
const ORDER_CLEAR_DROPOFF = 'ORDER_CLEAR_DROPOFF';
const ORDER_SET_ESTIMATED_DATA = 'ORDER_SET_ESTIMATED_DATA';
const ORDER_SET_DATA = 'ORDER_SET_DATA';
const ORDER_CLEAR = 'ORDER_CLEAR';
const ORDER_SET_HISTORY = 'ORDER_SET_HISTORY';
const ORDER_SET_SHEDULE = 'ORDER_SET_SHEDULE';
const ORDER_ADD_POINT = 'ORDER_ADD_POINT';
const ORDER_SET_POINT_LOCATION = 'ORDER_SET_POINT_LOCATION';
const ORDER_REMOVE_POINT = 'ORDER_REMOVE_POINT';
const ORDER_SET_SHEDULED = 'ORDER_SET_SHEDULED';
const initialState = {
  isLoading: false,
  current: null,
  pickup: null,
  dropoff: null,
  payment: 'cash',
  estimated: null,
  activeOrder: null,
  history: [],
  points: [],
  sheduleDate: null,
  page: 0,
  lastPage: -1,
  sheduled: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_SET_LOADING: {
      return {...state, isLoading: action.status};
    }
    case ORDER_SET_PICKUP_LOCATION: {
      return {...state, pickup: action.location};
    }
    case ORDER_SET_DROPOFF_LOCATION: {
      return {...state, dropoff: action.location};
    }
    case ORDER_SET_CURRENT_LOCATION: {
      return {...state, current: action.location};
    }
    case ORDER_SET_PAYMENT_METHOD: {
      return {...state, payment: action.payment};
    }
    case ORDER_CLEAR_DROPOFF: {
      return {...state, dropoff: null};
    }
    case ORDER_CLEAR_PICKUP: {
      return {...state, pickup: null, dropoff: null};
    }
    case ORDER_SET_ESTIMATED_DATA: {
      return {...state, estimated: action.estimated};
    }
    case ORDER_SET_DATA: {
      return {...state, activeOrder: action.order};
    }
    case ORDER_CLEAR: {
      return {...initialState, pickup: null, dropoff: null};
    }
    case ORDER_SET_POINT_LOCATION: {
      let points = state.points.slice();
      points[points.length - 1] = action.location;
      return {...state, points};
    }
    case ORDER_ADD_POINT: {
      let points = state.points.slice();
      if (points.length == 0 || points[points.length - 1]) points.push(null);

      return {...state, points};
    }
    case ORDER_SET_HISTORY: {
      return {
        ...state,
        history: [...state.history, ...action.history],
        page: action.page,
        lastPage: action.lastPage,
      };
    }
    case ORDER_REMOVE_POINT: {
      let points = state.points.slice();
      points.splice(action.index, 1);
      return {...state, points};
    }
    case ORDER_SET_SHEDULE: {
      return {...state, sheduleDate: action.date};
    }
    case ORDER_SET_SHEDULED: {
      return {...state, sheduled: action.sheduled};
    }
    default:
      return state;
  }
};
