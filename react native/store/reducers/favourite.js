const FAVOURITE_SET_LOADING = 'FAVOURITE_SET_LOADING';
const FAVOURITE_CLEAR = 'FAVOURITE_CLEAR';
const FAVOURITE_SET_LIST = 'FAVOURITE_SET_LIST';
const initialState = {
  isLoading: false,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FAVOURITE_SET_LOADING: {
      return {...state, isLoading: action.status};
    }
    case FAVOURITE_SET_LIST: {
      return {...state, list: action.list};
    }
    case FAVOURITE_CLEAR: {
      return {...initialState};
    }
    default:
      return state;
  }
};
