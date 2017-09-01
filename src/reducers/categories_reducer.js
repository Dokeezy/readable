import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS_BY_CATEGORY
} from '../actions';

function categories (state = {}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action;

      var newCategoriesState = {};
      for (var prop in categories) {
      	newCategoriesState[categories[prop].name] = categories[prop];
      }

      return { ...newCategoriesState }

    case RECEIVE_POSTS_BY_CATEGORY:
      const { posts, category } = action;

      return {
        ...state,
        [category]: {
          ...state[category],
          posts
        }
      }

    default:
      return state;
  }
}

export default categories;
