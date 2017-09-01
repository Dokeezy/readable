import React, { Component } from 'react';
import * as API from './utils/api.js';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import PostDetail from './PostDetail';
import CategoryPage from './CategoryPage';
import CreatePost from './CreatePost';

class App extends Component {

  componentDidMount() {
    API.getAllPosts().then(data => {
      console.log(data);
    });
  }

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
          <PostDetail />
        )}/>
        <Route path="/post/create" render={() => (
          <CreatePost />
        )}/>
      </div>
    );
  }
}

export default App;
