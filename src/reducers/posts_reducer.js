import {
  RECEIVE_POSTS_BY_CATEGORY,
  RECEIVE_ALL_POSTS,
  RECEIVE_POST_DETAILS,
  RECEIVE_VOTE_FOR_POST,
  FINISH_UPDATE_POST,
  FINISH_DELETE_POST,
  FINISH_CREATE_NEW_POST
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

    case FINISH_DELETE_POST:
      return {
        ...state,
        [post.id]: {
        ...post,
        deleted: true
        }
      }

    case FINISH_UPDATE_POST:
      return {
        ...state,
        [post.id]: {
        ...post,
        title: post.title,
        body: post.body
        }
      }

    case RECEIVE_VOTE_FOR_POST:
      return {
        ...state,
        [post.id]: {
        ...post
      }
    }

    case FINISH_CREATE_NEW_POST:
      return {
        ...state,
        [post.id]: {
          ...post
        }
      }

    default:
      return state;
  }
}

export default posts;
