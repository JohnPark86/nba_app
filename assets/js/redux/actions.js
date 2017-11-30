'use-strict';

export const addSearchParam = input => {
  return {
    type: 'SEARCH_PARAM',
    id: 'player',
    text: input
  }
}