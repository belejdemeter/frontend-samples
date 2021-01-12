const MAP_ATTEMPT = 'MAP_ATTEMPT';
const MAP_CLEAR = 'MAP_CLEAR';
const MAP_LIST_TOGGLE = 'MAP_LIST_TOGGLE';
const MAP_TASK_POINT = 'MAP_TASK_POINT';
const MAP_ROUTE_SUCCESS = 'MAP_ROUTE_SUCCESS';
const MAP_SET_CURRENT_TASK_ROUTE = 'MAP_SET_CURRENT_TASK_ROUTE';
const initialState = {
  routes: [],
  pendign: false,
  waypoints: [],
  isList: false,
  taskPoint: null,
  currentRoute: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAP_ATTEMPT: {
      return {
        ...state,
        pending: action.status,
      };
    }
    case MAP_ROUTE_SUCCESS: {
      let routes = state.routes.slice();
      let index = routes.find(item => item.key == action.route.key);
      if (index != -1) {
        routes.splice(index, 1, action.route);
      } else {
        routes.push(action.route);
      }

      return {
        ...state,
        // pending: false,
        routes,
      };
    }
    case MAP_CLEAR: {
      return {...initialState};
    }
    case MAP_LIST_TOGGLE: {
      return {...state, isList: action.isList};
    }
    case MAP_TASK_POINT: {
      return {...state, taskPoint: action.point};
    }
    case MAP_SET_CURRENT_TASK_ROUTE: {
      return {...state, currentRoute: action.route};
    }
    default:
      return state;
  }
};
