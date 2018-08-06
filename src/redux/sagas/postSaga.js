import { call, put, takeLatest } from 'redux-saga/effects';
import { POST_ACTIONS } from '../actions/postActions';
import axios from 'axios';

function* getPosts( action ) {
    try {
        const postResponse = yield call( axios.get, `/api/post/` );
        yield put({ type: 'SET_POSTS', payload: postResponse.data });
    }
    catch ( error ) {
        console.log( 'Error in postList', error );
    }
}

function* getAllPosts( action ) {
    try {
        console.log('in getAllPosts saga');
        const postResponse = yield call( axios.get, `/api/post/all` );
        yield put({ type: 'SET_ALL_POSTS', payload: postResponse.data });
    }
    catch ( error ) {
        console.log( 'Error in postList', error );
    }
}

function* getPartnerPosts( action ) {
    try {
        const postResponse = yield call( axios.get, `/api/partner/${action.payload}/posts` );
        yield put({ type: 'GET_PARTNER_POSTS', payload: postResponse.data });
    }
    catch ( error ) {
        console.log( 'Error in postList', error );
    }
}

function* addPost( action ) {
    try {
        yield call( axios.post, '/api/post', action.payload );
        yield put({ type: 'SET_POST' })
    }
    catch ( error ) {
        console.log( 'Error in postList', error );
    }
}

function* editPost( action ) {
    try {
        console.log('edit payload', action.payload);
        const postResponse = yield call( axios.put, `/api/post/${action.payload.id}`, action.payload );
        yield put({ type: 'FETCH_ALL_POSTS' })
    }
    catch ( error ) {
        console.log( 'Error in postList', error );
    }
}

function* hidePost( action ) {
    try {
        yield call( axios.put, `/api/post/hide/${action.payload.post_id}`, action.payload );
        yield put({ type: 'FETCH_ALL_POSTS' })
    }
    catch ( error ) {
        console.log( 'Error in postList', error );
    }
}

// function* deletePost( action ) {
//     let id = action.payload.id;
//     try {
//         // const postResponse = yield call( axios.delete, `/api/post/${ id }` );
//         yield put({ type: 'FETCH_POSTS' })
//     }
//     catch ( error ) {
//         console.log( 'Error in deletePost', error );
//     }
// }

function* postSaga() {
    yield takeLatest(POST_ACTIONS.FETCH_POSTS, getPosts);
    yield takeLatest(POST_ACTIONS.FETCH_ALL_POSTS, getAllPosts);
    yield takeLatest(POST_ACTIONS.FETCH_PARTNER_POSTS, getPartnerPosts);
    yield takeLatest(POST_ACTIONS.ADD_POST, addPost);
    yield takeLatest(POST_ACTIONS.EDIT_POST, editPost);
    yield takeLatest(POST_ACTIONS.HIDE_POST, hidePost);
    // yield takeLatest(POST_ACTIONS.DELETE_POST, deletePost);
  }
  
  export default postSaga;