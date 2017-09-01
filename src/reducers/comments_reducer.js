import {
  RECEIVE_COMMENTS_BY_POST
} from '../actions';

function comments (state = {}, action) {
  const { comments } = action;

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
