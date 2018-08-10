import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN_ACTIONS } from '../actions/loginActions';
import { USER_ACTIONS } from '../actions/userActions';
import { callLogin, callLogout, callRegistration } from '../requests/loginRequests';

// worker Saga: will be fired on "LOGIN" actions
function* loginUser(action) {
  try {
    yield put({ type: LOGIN_ACTIONS.CLEAR_LOGIN_ERROR });
    yield put({ type: LOGIN_ACTIONS.REQUEST_START });
    yield callLogin(action.payload);
    yield put({
      type: LOGIN_ACTIONS.LOGIN_REQUEST_DONE,
    });
    yield put({
      type: USER_ACTIONS.FETCH_USER,
    });
  } catch (error) {
    yield put({
      type: LOGIN_ACTIONS.LOGIN_REQUEST_DONE,
    });
    if (error.status === 401) {
      yield put({
        type: LOGIN_ACTIONS.LOGIN_FAILED,
        message: error.message,
      });
    } else {
      yield put({
        type: LOGIN_ACTIONS.LOGIN_FAILED_NO_CODE,
        message: error.message,
      });
    }
  }
}

function* registerUser(action) {
  try {
    yield put({ type: LOGIN_ACTIONS.REQUEST_START });
    yield callRegistration(action.payload);
    yield put({
      type: LOGIN_ACTIONS.LOGIN_REQUEST_DONE,
    });
  } catch (error) {
    console.log(`error with the register user saga: `, error);
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action) {
  try {
    yield callLogout(action.payload);
    yield put({
      type: USER_ACTIONS.UNSET_USER,
    });
    window.location.hash = '#/newsfeed';
  } catch (error) {
    console.log('LOGOUT FAILED -- CHECK YOUR SERVER', error);
  }
}

function* loginSaga() {
  yield takeLatest(LOGIN_ACTIONS.LOGIN, loginUser);
  yield takeLatest(LOGIN_ACTIONS.LOGOUT, logoutUser);
  yield takeLatest(LOGIN_ACTIONS.REGISTER, registerUser);
}

export default loginSaga;
