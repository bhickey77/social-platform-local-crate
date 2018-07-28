import { put, takeLatest } from 'redux-saga/effects';
import { PARTNER_ACTIONS } from '../actions/partnerActions';


function* getPartners( action ) {
    try {
        const charResponse = yield call( axios.get, `/api/admin/partner` );
        yield put({ type: 'SET_PARTNERS', payload: charResponse.data });
    }
    catch ( error ) {
        console.log( 'Error in getPartners', error );
    }
}

// Not sure if we want this?
function* addPartner( action ) {
    try {
        const charResponse = yield call( axios.post, `/api/admin/partner`, action.payload );
        yield put({ type: 'FETCH_PARTNERS' })
    }
    catch ( error ) {
        console.log( 'Error in addPartner', error );
    }
}

function* hidePartner( action ) {
    try {
        const charResponse = yield call( axios.put, `/api/admin/partner/${id}`, action.payload );
        yield put({ type: 'FETCH_PARTNERS' })
    }
    catch ( error ) {
        console.log( 'Error in editPartner', error );
    }
}

function* deletePartner( action ) {
    let id = action.payload.id;
    try {
        const charResponse = yield call( axios.delete, `/api/admin/partner/${ id }` );
        yield put({ type: 'FETCH_PARTNERS' })
    }
    catch ( error ) {
        console.log( 'Error in deletePartner', error );
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