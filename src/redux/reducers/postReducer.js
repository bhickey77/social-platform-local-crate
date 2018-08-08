import { combineReducers } from 'redux';
import { POST_ACTIONS } from '../actions/postActions';

const unHiddenPosts = ( state = [], action ) => {
    switch ( action.type ) {
        case POST_ACTIONS.SET_POSTS :
            return action.payload;
        default:
            return state;
    }
}

const allPosts = ( state = [], action ) => {
    switch ( action.type ) {
        case POST_ACTIONS.SET_ALL_POSTS :
            return action.payload;
        case POST_ACTIONS.GET_POSTS_FILTERED :
            return action.payload;
        default:
            return state;
    }
}

const store = combineReducers({
    unHiddenPosts,
    allPosts,
});

export default store;