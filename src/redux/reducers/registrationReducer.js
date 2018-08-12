import { combineReducers } from 'redux';

const justRegistered = (state = false, action) => {
  switch (action.type) {
    case 'JUST_REGISTERED':
      return true;
    case 'DONE_REGISTRATION':
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  justRegistered,
});
