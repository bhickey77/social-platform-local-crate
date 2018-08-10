import { combineReducers } from 'redux';
import { PARTNER_ACTIONS } from '../actions/partnerActions';

const partners = ( state = [], action ) => {
    switch ( action.type ) {
        case PARTNER_ACTIONS.SET_PARTNERS :
        console.log( 'partners', action.payload)
        return action.payload;
        default:
            return state;
    }
}

const partner = ( state = [], action ) => {
    switch ( action.type ) {
        case PARTNER_ACTIONS.SET_PARTNER :
            console.log( 'partner', action.payload)
            return action.payload;
        default:
            return state;
    }
}

const partnerPosts = ( state = [], action ) => {
    switch ( action.type ) {
        case PARTNER_ACTIONS.SET_PARTNER_POSTS:
            console.log( 'partner', action.payload)
            return action.payload;
        default:
            return state;
    }
}

const store = combineReducers({
    partners, partner, partnerPosts
});

export default store;