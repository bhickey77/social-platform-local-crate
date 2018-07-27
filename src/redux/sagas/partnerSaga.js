import { put, takeLatest } from 'redux-saga/effects';
import { PARTNER_ACTIONS } from '../actions/partnerActions';


function* getPartners( action ) {
    try {
        const charResponse = yield call( axios.get, `/api/admin/getPartners` );
        yield put({ type: 'SET_PARTNERS', payload: charResponse.data });
    }
    catch ( error ) {
        console.log( 'Error in charList', error );
    }
}

function* hidePartner( action ) {
    try {
        const charResponse = yield call( axios.put, '/api/char', action.payload );
        yield put({ type: 'FETCH_PARTNERS' })
    }
    catch ( error ) {
        console.log( 'Error in newChar', error );
    }
}

function* hidePartner( action ) {
    try {
        const charResponse = yield call( axios.put, '/api/char', action.payload );
        yield put({ type: 'FETCH_PARTNERS' })
    }
    catch ( error ) {
        console.log( 'Error in newChar', error );
    }
}

function* deletePartner( action ) {
    let id = action.payload.id;
    try {
        const charResponse = yield call( axios.delete, `/api/char/${ id }` );
        yield put({ type: 'FETCH_PARTNERS' })
    }
    catch ( error ) {
        console.log( 'Error in deleteChar', error );
    }
}

function* partnerSaga() {
    yield takeLatest(PARTNER_ACTIONS.FETCH_PARTNERS, getPartners);
    yield takeLatest(PARTNER_ACTIONS.ADD_PARTNER, addPartner);
    yield takeLatest(PARTNER_ACTIONS.EDIT_PARTNER, editPartner);
    yield takeLatest(PARTNER_ACTIONS.HIDE_PARTNER, hidePartner);
    yield takeLatest(PARTNER_ACTIONS.DELETE_PARTNER, deletePartner);
  }
  
  export default partnerSaga;