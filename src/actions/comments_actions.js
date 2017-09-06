import * as API from '../utils/api.js';
export const RECEIVE_COMMENTS_BY_POST = 'RECEIVE_COMMENTS_BY_POST';
export const NEW_COMMENT_CREATED = 'NEW_COMMENT_CREATED';
export const RECEIVE_VOTE_FOR_COMMENT = 'RECEIVE_VOTE_FOR_COMMENT';
export const FINISH_UPDATE_COMMENT = 'FINISH_UPDATE_COMMENT';
export const FINISH_DELETE_COMMENT = 'FINISH_DELETE_COMMENT';

export const receiveCommentsByPost = comments => ({
  type: RECEIVE_COMMENTS_BY_POST,
  comments
});

export const getCommentsByPost = postId => dispatch => (
  API
      .getCommentsByPost(postId)
      .then(comments => dispatch(receiveCommentsByPost(comments)))
);



export const newCommentCreated = comment => ({
  type: NEW_COMMENT_CREATED,
  comment
});

export const createNewComment = comment => dispatch => (
  API
      .createNewComment(comment)
      .then(comment => dispatch(newCommentCreated(comment)))
);

export const receiveVoteForComment = comment => ({
  type: RECEIVE_VOTE_FOR_COMMENT,
  comment
});

export const voteForComment = (commentId, voteType) => dispatch => (
  API
      .voteForComment(commentId, voteType)
      .then(comment => dispatch(receiveVoteForComment(comment)))
);

export const finishUpdateComment = comment => ({
  type: FINISH_UPDATE_COMMENT,
  comment
});

export const updateComment = (commentId, timestamp, body) => dispatch => (
  API
      .updateComment(commentId, timestamp, body)
      .then(comment => dispatch(finishUpdateComment(comment)))
);

export const finishDeleteComment = comment => ({
  type: FINISH_DELETE_COMMENT,
  comment
});

export const deleteComment = commentId => dispatch => (
  API
      .deleteComment(commentId)
      .then(comment => dispatch(finishDeleteComment(comment)))
);
