import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCategories, getAllPosts, getCommentsByPost } from '../actions';
import { Link } from 'react-router-dom';
import * as API from '../utils/api.js';
import PostPreview from './PostPreview';

class HomePage extends Component {

  state = {
    sortedBy: 'date'
  }

  componentDidMount() {
    this.props.getAllPosts().then((data) => {
      data.posts.forEach(post => {
        this.props.getCommentsByPost(post.id);
      });
    });
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
            <div>
              <p>Sort posts by :</p>
              <select onChange={(e) => {
                this.setState({ sortedBy: e.target.value });
              }} value={this.state.sortedBy}>
                <option value="date">Date</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </nav>
        </div>
        <hr></hr>
        <div>
          <button>Create Post</button>
        </div>
        <div>
          {this.props.posts.sort((a, b) => {
            if (this.state.sortedBy === 'popularity') {
              return b.voteScore - a.voteScore;
            }
            if (this.state.sortedBy === 'date') {
              return b.timestamp - a.timestamp;
            }
          }).map(post => {
            var commentsNumber = 0;
            this.props.comments.forEach(comment => {
              if (comment.parentId === post.id) {
                commentsNumber++;
              }
            });
            return <PostPreview commentsNumber={commentsNumber} post={post} key={post.id} />
          })}
        </div>

      </div>
    );
  }
}

function mapStateToProps ({ categories, posts, comments }) {
  return {
    categories: Object.keys(categories),
    posts: Object.values(posts),
    comments: Object.values(comments)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: (data) => dispatch(getAllPosts(data)),
    getCommentsByPost: (data) => dispatch(getCommentsByPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
