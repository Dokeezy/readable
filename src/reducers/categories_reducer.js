import {
  RECEIVE_CATEGORIES
} from '../actions';

function categories (state = {}, action) {
  const { categories } = action;

  switch (action.type) {
    case RECEIVE_CATEGORIES:
      var newCategoriesState = {};
      
      for (var prop in categories) {
      	newCategoriesState[categories[prop].name] = categories[prop];
      }

      return { ...newCategoriesState }

    default:
      return state;
  }
}

export default categories;
