import React, { Component } from 'react';

class Comment extends Component {

  render() {
    return (
      <div className="comment">
        <p><b>{this.props.comment.author}</b></p>
        <p>{this.props.comment.body}</p>
        <p>Score : {this.props.comment.voteScore}</p>
        <button onClick={() => {
          this.props.voteForComment(this.props.comment.id, 'upVote');
        }}>Up</button>
        <button onClick={() => {
          this.props.voteForComment(this.props.comment.id, 'downVote');
        }}>Down</button>
      </div>
    );
  }
}

export default Comment;
