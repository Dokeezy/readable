import {
  RECEIVE_COMMENTS_BY_POST,
  NEW_COMMENT_CREATED,
  RECEIVE_VOTE_FOR_COMMENT
} from '../actions';

function comments (state = {}, action) {
  const { comments, comment } = action;

  if (comment) {
    var newCommentState = {
      [comment.id]: {
        ...comment
      }
    };
  } else {
    var newCommentsState = {};
    for (var prop in comments) {
      newCommentsState[comments[prop].id] = comments[prop];
    }
  }

  switch (action.type) {
    case RECEIVE_COMMENTS_BY_POST:
      return {
        ...state,
        ...newCommentsState
      }

    case NEW_COMMENT_CREATED:
      return {
        ...state,
        [comment.id]: {
          ...comment
        }
      }

    case RECEIVE_VOTE_FOR_COMMENT:
      return {
        ...state,
        [comment.id]: {
        ...comment
      }
    }

    default:
      return state;
  }
}

export default comments;
