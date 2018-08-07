import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* registerUser( action ) {
    try {
      yield call(axios.post, '/api/user/register/', action.payload);
    }
    catch {
        console.log( 'Error in registerUser', error );
    }
}

function* registerSaga() {
    yield takeLatest('REGISTER_USER', registerUser);
  }
  
  export default registerSaga;