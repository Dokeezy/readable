import * as API from '../utils/api.js';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_COMMENTS_BY_POST = 'RECEIVE_COMMENTS_BY_POST';

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
      .then(posts => dispatch(receivePostsByCategory(posts)))
);

export const receiveAllPosts = posts => ({
  type: RECEIVE_ALL_POSTS,
  posts
});

export const getAllPosts = () => dispatch => (
  API
      .getAllPosts()
      .then(posts => dispatch(receiveAllPosts(posts)))
);

export const receiveCommentsByPost = comments => ({
  type: RECEIVE_COMMENTS_BY_POST,
  comments
});

export const getCommentsByPost = (post) => dispatch => (
  API
      .getCommentsByPost(post)
      .then(comments => dispatch(receiveAllPosts(comments)))
);
