'use strict';

const SEARCH_PARAM = 'SEARCH_PARAM';

function searchReducer(state = false, action) {
    if (action.type === SEARCH_PARAM) {
        return action.payload;
    }
    return state;
}


