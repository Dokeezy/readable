import {
  RECEIVE_COMMENTS_BY_POST
} from '../actions';

function comments (state = {}, action) {
  const { comments, comment } = action;

  if (comment) {
    var newCommentState = {
      [comment.parentId]: {
        ...comment
      }
    };
  } else {
    var newCommentsState = {};
    for (var prop in comments) {
      newCommentsState[comments[prop].parentId] = comments[prop];
    }
  }

  switch (action.type) {
    case RECEIVE_COMMENTS_BY_POST:
      return {
        ...state,
        ...comments
      }

    default:
      return state;
  }
}

export default comments;
