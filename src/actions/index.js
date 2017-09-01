import * as API from '../utils/api.js';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const getAllCategories = () => dispatch => (
  API
      .getAllCategories()
      .then(categories => dispatch(receiveCategories(categories)))
);
