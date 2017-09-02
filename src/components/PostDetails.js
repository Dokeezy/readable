import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostDetails, getCommentsByPost } from '../actions';

class PostDetails extends Component {

  componentDidMount() {
    if (!this.props.post) {
      this.props.getPostDetails(this.props.match.params.postId);
    }
    if (Object.keys(this.props.comments).length === 0) {
      this.props.getCommentsByPost(this.props.match.params.postId);
    }
  }

  render() {
    return (
      <div>
          <div>
            <nav>
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
          {this.props.post && (
            <div>
              <h2>{this.props.post.title}</h2>
              <p>{this.props.post.body}</p>
              <p>Created by <b>{this.props.post.author}</b></p>
              <p>Current score : {this.props.post.voteScore}</p>
              <ul>
                {this.props.comments.map(comment => {
                  return <li>{comment.body}</li>
                })}
              </ul>
            </div>
          )}
      </div>
    );
  }
}

function mapStateToProps ({ categories, posts, comments }) {
  const postId = window.location.pathname.split('/')[2];
  return {
    categories: Object.keys(categories),
    post: posts[postId],
    comments: Object.values(comments).filter(comment => {
      return comment.parentId === postId;
    })
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPostDetails: (data) => dispatch(getPostDetails(data)),
    getCommentsByPost: (data) => dispatch(getCommentsByPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);
