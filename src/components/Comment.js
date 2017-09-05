import React, { Component } from 'react';

class Comment extends Component {
  state = {
    isEditing: false
  }


  render() {
    return (
      <div className="comment">
        {this.state.isEditing === false && (
          <div>
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
        )}
        {this.state.isEditing === true && (
          <div>
              <textarea value={this.props.comment.body} onChange={(e) => {
                this.props.updateComment(this.props.comment.id, Date.now(), e.target.value);
              }}/>
          </div>
        )}
        <div>
          <button onClick={() => {
            this.props.deleteComment(this.props.comment.id);
          }}>Delete</button>
          <button onClick={() => {
            this.setState({ isEditing: !this.state.isEditing });
          }}>{this.state.isEditing === false ? 'Edit' : 'Save'}</button>
        </div>
      </div>

    );
  }
}

export default Comment;
