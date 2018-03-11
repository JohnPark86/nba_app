'use-strict';

/*
* An Action that dispatches data to redux store.
*
@param input the input to the search bar that
*              updates the redux store.
*/
export const addSearchParam = input => {
  return {
    type: 'SEARCH_PARAM',
    id: 'player',
    text: input
  }
}
