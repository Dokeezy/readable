import {
  RECEIVE_CATEGORIES
} from '../actions';

function comments (state = {}, action) {
  switch (action.type) {
    case ADD_RECIPE:
      const { recipe } = action;

      return {
        ...state,
        [recipe.label]: recipe
      }
    default:
      return state;
  }
}

export default comments;
