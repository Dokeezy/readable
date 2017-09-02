import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPostDetails, getCommentsByPost, createNewComment } from '../actions';
import uuidv4 from 'uuid/v4';

class PostDetails extends Component {

  state = {
    body: ''
  }

  componentDidMount() {
    if (!this.props.post) {
      this.props.getPostDetails(this.props.match.params.postId);
    }
    if (Object.keys(this.props.comments).length === 0) {
      this.props.getCommentsByPost(this.props.match.params.postId);
    }
  }

  onCommentCreation(e) {
    e.preventDefault();
    this.props.createNewComment({
      id: uuidv4(),
      timestamp: Date.now(),
      body: this.state.body,
      owner: 'Dokeezy',
      parentId: this.props.post.id
    });
    this.setState({ body: '' });
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
                  return <li key={comment.id}>{comment.body}</li>
                })}
              </ul>
              <form onSubmit={(e) => this.onCommentCreation(e)}>
                <textarea value={this.state.body} onChange={(e) => {
                  this.setState({ body: e.target.value })
                }}/>
                <br />
                <button>Submit</button>
              </form>
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
    getCommentsByPost: (data) => dispatch(getCommentsByPost(data)),
    createNewComment: (data) => dispatch(createNewComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);
