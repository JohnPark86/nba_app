'use strict';

import {combineReducers} from 'redux';

const SEARCH_PARAM = 'SEARCH_PARAM';

const searchReducer = (state = '', action) => {
    if (action.type === SEARCH_PARAM) {
        return action.text;
    }
    return state;
}

export const reducers = combineReducers({
    searchReducer
})

export default reducers;
