import { combineReducers } from 'redux';

import {
  SET_DIRECTORS,
  SET_FILTER,
  SET_GENRES,
  SET_MOVIES,
  SET_USER,
  SET_USERINFO,
} from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function genres(state = [], action) {
  switch (action.type) {
    case SET_GENRES:
      return action.value;
    default:
      return state;
  }
}

function directors(state = [], action) {
  switch (action.type) {
    case SET_DIRECTORS:
      return action.value;
    default:
      return state;
  }
}

function userInfo(state = '', action) {
  switch (action.type) {
    case SET_USERINFO:
      return action.value;
    default:
      return state;
  }
}
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  userInfo,
  genres,
  directors,
});

export default moviesApp;
