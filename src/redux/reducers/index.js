import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import partner from './partnerReducer';
import person from './personReducer';
import post from './postReducer';

const store = combineReducers({
  user,
  login,
  partner,
  person,
  post
});

export default store;
