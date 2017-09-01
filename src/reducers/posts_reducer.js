import {
  RECEIVE_POSTS_BY_CATEGORY,
  RECEIVE_ALL_POSTS
} from '../actions';

function posts (state = {}, action) {
  const { posts } = action;
  var newPostsState = {};

  for (var prop in posts) {
    newPostsState[posts[prop].id] = posts[prop];
  }

  switch (action.type) {

    case RECEIVE_POSTS_BY_CATEGORY:
      return { ...state, ...newPostsState }

    case RECEIVE_ALL_POSTS:
      return { ...newPostsState }

    default:
      return state;
  }
}

export default posts;
