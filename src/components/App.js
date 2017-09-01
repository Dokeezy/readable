import React, { Component } from 'react';
import * as API from '../utils/api.js';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import PostDetails from './PostDetails';
import CategoryPage from './CategoryPage';
import CreatePost from './CreatePost';

class App extends Component {

  render() {
    return (
      <div>
        <Route path="/" exact render={() => (
          <HomePage />
        )}/>
        <Route path="/:category" render={() => (
          <CategoryPage />
        )}/>
        <Route path="/:category/:postId" render={() => (
          <PostDetails />
        )}/>
        <Route path="/post/create" render={() => (
          <CreatePost />
        )}/>
      </div>
    );
  }
}

export default App;
