import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import PostDetails from './PostDetails';
import CategoryPage from './CategoryPage';
import { connect } from 'react-redux';
import { getAllCategories } from '../actions/categories_actions';

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

export default withRouter(connect(
  mapStateToProps,
  { getAllCategories }
)(App));
