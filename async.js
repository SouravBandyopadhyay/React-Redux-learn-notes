import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
const initialState = {
  loading: false,
  users: [],
  error: '',
};
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchusersRequested = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchusersSucceeded = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};
const fetchusersFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: '',
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
  }
};

// fetch request api call
const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchusersRequested()); // set Loading to true
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        const users = res.data.map((el) => el.name);
        dispatch(fetchusersSucceeded(users)); // if api call is successful
      })
      .catch((err) => {
        dispatch(fetchusersFailed(err)); // error handling
      });
  };
};
const store = createStore(reducer, applyMiddleware(thunk.default));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUser());
// The word "thunk" is a programming term that means "a piece of code that does some delayed work".
