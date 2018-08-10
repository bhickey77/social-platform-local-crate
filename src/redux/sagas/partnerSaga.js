import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { PARTNER_ACTIONS } from '../actions/partnerActions';
import { updateProfileImage } from '../requests/partnerRequests';


function* getPartners( action ) {
    try {
        const partnerResponse = yield call( axios.get, `/api/partner` );
        console.log( 'partnerResponse', partnerResponse.data )
        yield put({ type: 'SET_PARTNERS', payload: partnerResponse.data });
    }
    catch ( error ) {
        console.log( 'Error in getPartners', error );
    }
}

function* getPartner( action ) {
    try {
        let id = action.payload;
        const partnerResponse = yield call( axios.get, `/api/partner/${id}` );
        yield put({ type: 'SET_PARTNER', payload: partnerResponse.data[0] });
        const partnerPosts = yield call( axios.get, `/api/partner/${id}/posts` );
        yield put({ type: PARTNER_ACTIONS.SET_PARTNER_POSTS, payload: partnerPosts.data });
    }
    catch ( error ) {
        console.log( 'Error in getPartner', error );
    }
}

// Not sure if we want this?
function* addPartner( action ) {
    try {
        yield call( axios.post, `/api/partner`, action.payload );
        yield put({ type: 'FETCH_PARTNERS' })
    }
    catch ( error ) {
        console.log( 'Error in addPartner', error );
    }
}

function* hidePartner( action ) {
    try {
        // const partnerResponse = yield call( axios.put, `/api/partner/${id}`, action.payload );
        yield put({ type: 'FETCH_PARTNERS' })
    }
    catch ( error ) {
        console.log( 'Error in editPartner', error );
    }
}

function* deletePartner( action ) {
    let id = action.payload.id;
    try {
        yield call( axios.delete, `/api/partner/${ id }` );
        yield put({ type: 'FETCH_PARTNERS' })
    }
    catch ( error ) {
        console.log( 'Error in deletePartner', error );
    }
}

function* editProfileImage( action ) {
    try {
        yield updateProfileImage(action.payload.imageData, action.payload.partner_id);
        yield put({type: PARTNER_ACTIONS.GET_PARTNER, payload: action.payload.partner_id })
    }
    catch ( error ) {
        console.log( 'Error in deletePartner', error );
    }
}


function* partnerSaga() {
    yield takeLatest(PARTNER_ACTIONS.FETCH_PARTNERS, getPartners);
    yield takeLatest(PARTNER_ACTIONS.ADD_PARTNER, addPartner);
    yield takeLatest(PARTNER_ACTIONS.GET_PARTNER, getPartner);
    // yield takeLatest(PARTNER_ACTIONS.EDIT_PARTNER, editPartner);
    yield takeLatest(PARTNER_ACTIONS.HIDE_PARTNER, hidePartner);
    yield takeLatest(PARTNER_ACTIONS.DELETE_PARTNER, deletePartner);
    yield takeLatest(PARTNER_ACTIONS.EDIT_PROFILE_IMAGE, editProfileImage);
  }
  
  export default partnerSaga;