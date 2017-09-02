import {
  RECEIVE_POSTS_BY_CATEGORY,
  RECEIVE_ALL_POSTS,
  RECEIVE_POST_DETAILS
} from '../actions';

function posts (state = {}, action) {
  const { posts, post } = action;
  var newPostsState = {};
  if (post) {
    var newPostState = {
      [post.id]: {
        ...post
      }
    };
  }

  for (var prop in posts) {
    newPostsState[posts[prop].id] = posts[prop];
  }

  switch (action.type) {

    case RECEIVE_POSTS_BY_CATEGORY:
      return { ...state, ...newPostsState }

    case RECEIVE_ALL_POSTS:
      return { ...newPostsState }

    case RECEIVE_POST_DETAILS:
      return { ...state, ...newPostState }

    default:
      return state;
  }
}

export default posts;
