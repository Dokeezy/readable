import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPostDetails, voteForPost, deletePost, updatePost } from '../actions/posts_actions';
import { getCommentsByPost, createNewComment, voteForComment, updateComment, deleteComment } from '../actions/comments_actions';
import uuidv4 from 'uuid/v4';
import PostEdit from './PostEdit';
import Header from './Header';
import Comment from './Comment';
import { Link } from 'react-router-dom';

class PostDetails extends Component {

  state = {
    body: '',
    author: '',
    isEditing: false
  }

  componentDidMount() {
    !this.props.post ? this.props.getPostDetails(this.props.match.params.postId) : undefined;

    if (Object.keys(this.props.comments).length === 0) {
      this.props.getCommentsByPost(this.props.match.params.postId);
    }
  }

  onCommentCreation(e) {
    e.preventDefault();
    if (this.state.body.length > 0 && this.state.author.length > 0) {
      this.props.createNewComment({
        id: uuidv4(),
        timestamp: Date.now(),
        body: this.state.body,
        author: this.state.author,
        parentId: this.props.post.id
      });
      this.setState({ body: '' });
    }
  }

  render() {
    return (
      <div>
        {(this.props.post && this.props.post.deleted === false)  && (
          <div>
            {this.props.post && (
              <Header title={this.props.post.title} />
            )}
              <hr></hr>
              <button onClick={() => {
                this.props.deletePost(this.props.post.id);
              }}>Delete</button>
              <button onClick={() => {
                this.setState({ isEditing: !this.state.isEditing });
              }}>{this.state.isEditing === false ? 'Edit' : 'Save'}</button>
              {(this.props.post && this.state.isEditing === false  ) && (
                <div>
                  <div>
                    <button onClick={() => {
                      this.props.voteForPost(this.props.post.id, 'upVote');
                    }}>Up</button>
                    <button onClick={() => {
                      this.props.voteForPost(this.props.post.id, 'downVote');
                    }}>Down</button>
                  </div>
                  <h2>{this.props.post.title}</h2>
                  <p>{this.props.post.body}</p>
                  <p>Created by <b>{this.props.post.author}</b></p>
                  <p>Current score : {this.props.post.voteScore}</p>
                  <p>Comments :</p>
                  <ul>
                    {this.props.comments.map(comment => {
                      return <Comment key={comment.id} comment={comment} voteForComment={this.props.voteForComment} updateComment={this.props.updateComment} deleteComment={this.props.deleteComment}/>
                    })}
                  </ul>
                  <form onSubmit={(e) => this.onCommentCreation(e)}>
                    <input value={this.state.author} placeholder="Author" onChange={(e) => {
                      this.setState({ author: e.target.value })
                    }}/>
                    <br />
                    <textarea value={this.state.body} placeholder="New Comment" onChange={(e) => {
                      this.setState({ body: e.target.value })
                    }}/>
                    <br />
                    <button>Post Comment</button>
                  </form>
                </div>
              )}
              {this.state.isEditing === true && (
                <PostEdit post={this.props.post} updatePost={this.props.updatePost} />
              )}
          </div>
        )}
        {(!this.props.post || this.props.post.deleted === true) && (
          <div>
            <Header title="Unknown post" />
            <hr></hr>
            <div>
              <h1>The post you're looking for has been deleted...</h1>
              <p>But take a look at our other posts ! Let's go to the <Link to="/">home page</Link></p>
            </div>
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
      return comment.parentId === postId && comment.deleted === false;
    })
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPostDetails: (postId) => dispatch(getPostDetails(postId)),
    getCommentsByPost: (postId) => dispatch(getCommentsByPost(postId)),
    createNewComment: (comment) => dispatch(createNewComment(comment)),
    voteForPost: (postId, voteType) => dispatch(voteForPost(postId, voteType)),
    deletePost: (postId) => dispatch(deletePost(postId)),
    updatePost: (postId, title, body) => dispatch(updatePost(postId, title, body)),
    voteForComment: (commentId, voteType) => dispatch(voteForComment(commentId, voteType)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    updateComment: (commentId, timestamp, body) => dispatch(updateComment(commentId, timestamp, body))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);
