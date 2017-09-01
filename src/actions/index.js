import * as API from '../utils/api.js';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const getAllCategories = () => dispatch => (
  API
      .getAllCategories()
      .then(categories => dispatch(receiveCategories(categories)))
);

export const receivePostsByCategory = posts => ({
  type: RECEIVE_POSTS_BY_CATEGORY,
  posts
});

export const getPostsByCategory = (category) => dispatch => (
  API
      .getPostsByCategory(category)
      .then(posts => dispatch(receivePostsByCategory(posts, category)))
);
