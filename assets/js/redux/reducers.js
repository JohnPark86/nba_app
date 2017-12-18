'use strict';

import {combineReducers} from 'redux';

const SEARCH_PARAM = 'SEARCH_PARAM';

/*
*   Reducer that returns proper data dependant
*   on action type.
*   @param state - an empty state
*   @param action - the action to return
*/
const playerReducer = (state = '', action) => {
    if (action.type === SEARCH_PARAM) {
        return action.text;
    }
    return state;
}

export const reducers = combineReducers({
    playerReducer
})

export default reducers;
