import { call, put, takeLatest } from 'redux-saga/effects';
import { POST_ACTIONS } from '../actions/postActions';
import { sendEditPost } from '../requests/postRequests';
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
        console.log(`IN POST SAGA POST RESPONSE TO GET ALL POSTS: `, postResponse);
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


function* getFilteredPosts( action ) {
    console.log( 'payload test 1', action.payload );
    try {
        const postResponse = yield call( axios.get,
            `/api/post/filter/${action.payload.filter}/${action.payload.filteredBy}`);
        console.log( 'payload test 2', postResponse.data)
        yield put({ type: POST_ACTIONS.GET_POSTS_FILTERED, payload: postResponse.data,
        // params:{filter: action.payload.filter, filteredBy: action.payload.filteredBy}
    } );
    }
    catch ( error ) {
        console.log( 'Error in postList', error );
    }
}

function* addPost( action ) {
    try {
        console.log(`adding post`);
        yield call( axios.post, '/api/post', action.payload );
        yield put({ type: 'SET_POST' })
        console.log(`adding post 2`);
        yield getPosts();
        console.log(`adding post 2`);
        yield getPartnerPosts();
    }
    catch ( error ) {
        console.log( 'Error in postList', error );
    }
}

function* editPost( action ) {
    try {
        console.log('edit payload', action.payload);
        yield sendEditPost(action.payload, action.image);
        yield put({ type: 'FETCH_POSTS' })
        yield put({ type: 'FETCH_ALL_POSTS' });
    }
    catch ( error ) {
        console.log( 'Error in postList', error );
    }
}

function* hidePost( action ) {
    try {
        yield call( axios.put, `/api/post/hide/${action.payload.post_id}`, action.payload );
        yield put({ type: 'FETCH_ALL_POSTS' });
        yield put({ type: POST_ACTIONS.FETCH_POSTS });
    }
    catch ( error ) {
        console.log( 'Error in postList', error );
    }
}

function* deletePost( action ) {
    let id = action.payload;
    try {
        const postResponse = yield call( axios.delete, `/api/post/${ id }` );
        yield put({ type: POST_ACTIONS.FETCH_POSTS });
    }
    catch ( error ) {
        console.log( 'Error in deletePost', error );
    }
}

function* postSaga() {
    yield takeLatest(POST_ACTIONS.FETCH_POSTS, getPosts);
    yield takeLatest(POST_ACTIONS.FETCH_ALL_POSTS, getAllPosts);
    yield takeLatest(POST_ACTIONS.FETCH_PARTNER_POSTS, getPartnerPosts);
    yield takeLatest(POST_ACTIONS.FETCH_POSTS_FILTERED, getFilteredPosts);
    yield takeLatest(POST_ACTIONS.ADD_POST, addPost);
    yield takeLatest(POST_ACTIONS.EDIT_POST, editPost);
    yield takeLatest(POST_ACTIONS.HIDE_POST, hidePost);
    yield takeLatest(POST_ACTIONS.DELETE_POST, deletePost);
  }
  
  export default postSaga;