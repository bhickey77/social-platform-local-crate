import { combineReducers } from 'redux';
import { POST_ACTIONS } from '../actions/postActions';

const posts = ( state = [], action ) => {
    switch ( action.type ) {
        case POST_ACTIONS.SET_POSTS :
            return action.payload;
        default:
            return state;
    }
}

const user_posts = ( state = [], action ) => {
    switch ( action.type ) {
        case 'SET_PARTNER_POSTS' :
            return action.payload;
        default:
            return state;
    }
}

const store = combineReducers({
    posts,
    user_posts
});

export default store;