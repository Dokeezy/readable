import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost, updatePost } from '../actions';
import PostEdit from './PostEdit';

class PostPreview extends Component {

  state = {
    isEditing: false
  }

  render() {
    return (
      <div className="post-preview">
        {this.state.isEditing === false && (
          <div>
            <Link to={`/${this.props.post.category}/${this.props.post.id}`}>
              <h5>{this.props.post.title}</h5>
              <p>{this.props.post.body}</p>
              <p>Created by <b>{this.props.post.author}</b></p>
              <p>Current score : {this.props.post.voteScore}</p>
              <p>Comments : {this.props.commentsNumber}</p>
            </Link>
            <button onClick={() => {
              this.props.voteForPost(this.props.post.id, 'upVote');
            }}>Up</button>
            <button onClick={() => {
              this.props.voteForPost(this.props.post.id, 'downVote');
            }}>Down</button>
          </div>
        )}
        {this.state.isEditing === true && (
          <PostEdit post={this.props.post} updatePost={this.props.updatePost} />
        )}
        <button onClick={() => {
          this.props.deletePost(this.props.post.id);
        }}>Delete</button>
        <button onClick={() => {
          this.setState({ isEditing: !this.state.isEditing });
        }}>{this.state.isEditing === false ? 'Edit' : 'Save'}</button>
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
    deletePost: (postId) => dispatch(deletePost(postId)),
    updatePost: (postId, title, body) => dispatch(updatePost(postId, title, body))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPreview);
