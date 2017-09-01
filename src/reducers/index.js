import { combineReducers } from 'redux';
import categories from './categories_reducer';
import comments from './comments_reducer';
import posts from './posts_reducer';

export default combineReducers({
  categories,
  comments,
  posts
});
