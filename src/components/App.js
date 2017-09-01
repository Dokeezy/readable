import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import PostDetails from './PostDetails';
import CategoryPage from './CategoryPage';
import { connect } from 'react-redux';
import { getAllCategories } from '../actions';

class App extends Component {

  componentDidMount() {
    this.props.getAllCategories();
  }

  render() {
    return (
      <div>
        <Route path="/" exact component={HomePage} />
        <Route path="/:category" exact component={CategoryPage} />
        <Route path="/:category/:postId" component={PostDetails} />
      </div>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories: Object.keys(categories)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCategories: (data) => dispatch(getAllCategories(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
