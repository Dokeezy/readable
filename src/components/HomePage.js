import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCategories, getAllPosts } from '../actions';
import { Link } from 'react-router-dom';
import * as API from '../utils/api.js';
import PostPreview from './PostPreview';

class HomePage extends Component {

  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {
    return (
      <div>
        <div>
          <nav>
            <div>
              <h1>Readable</h1>
            </div>
            <div>
              <ul>
                <li key="home" >
                  <Link to="/">
                    Home
                  </Link>
                </li>
                {this.props.categories.map((category, index) => {
                  return (
                    <li key={index} >
                      <Link to={`/${category}`}>
                        {category}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>
        </div>
        <hr></hr>
        <div>
          <button>Create Post</button>
        </div>
        <div>
          {this.props.posts.map(post => {
            return <PostPreview post={post} key={post.id} />
          })}
        </div>

      </div>
    );
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
    categories: Object.keys(categories),
    posts: Object.values(posts)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: (data) => dispatch(getAllPosts(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
