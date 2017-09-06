import * as API from '../utils/api.js';
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY';
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_POST_DETAILS = 'RECEIVE_POST_DETAILS';
export const RECEIVE_VOTE_FOR_POST = 'RECEIVE_VOTE_FOR_POST';
export const FINISH_UPDATE_POST = 'FINISH_UPDATE_POST';
export const FINISH_DELETE_POST = 'FINISH_DELETE_POST';
export const FINISH_CREATE_NEW_POST = 'FINISH_CREATE_NEW_POST';



export const receivePostsByCategory = posts => ({
  type: RECEIVE_POSTS_BY_CATEGORY,
  posts
});

export const getPostsByCategory = category => dispatch => (
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

export const receivePostDetails = post => ({
  type: RECEIVE_POST_DETAILS,
  post
});

export const getPostDetails = postId => dispatch => (
  API
      .getPostDetails(postId)
      .then(post => dispatch(receivePostDetails(post)))
);

export const receiveVoteForPost = post => ({
  type: RECEIVE_VOTE_FOR_POST,
  post
});

export const voteForPost = (postId, voteType) => dispatch => (
  API
      .voteForPost(postId, voteType)
      .then(post => dispatch(receiveVoteForPost(post)))
);

export const finishUpdatePost = post => ({
  type: FINISH_UPDATE_POST,
  post
});

export const updatePost = (postId, title, body) => dispatch => (
  API
      .updatePost(postId, title, body)
      .then(post => dispatch(finishUpdatePost(post)))
);

export const finishDeletePost = post => ({
  type: FINISH_DELETE_POST,
  post
});

export const deletePost = postId => dispatch => (
  API
      .deletePost(postId)
      .then(post => dispatch(finishDeletePost(post)))
);

export const finishCreateNewPost = post => ({
  type: FINISH_CREATE_NEW_POST,
  post
});

export const createNewPost = post => dispatch => (
  API
      .createNewPost(post)
      .then(post => dispatch(finishCreateNewPost(post)))
);
