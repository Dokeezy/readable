import React, { Component } from 'react';

class PostForm extends Component {

  render() {

    return (
      <div>
          <input type="text" placeholder="Title" value={this.props.post.title} onChange={(e) => {
            this.props.updatePost(this.props.post.id, e.target.value, this.props.post.body);
          }}/>
          <textarea placeholder="Body" value={this.props.post.body} onChange={(e) => {
            this.props.updatePost(this.props.post.id, this.props.post.title, e.target.value);
          }}/>
      </div>
    );
  }
}

export default PostForm;
