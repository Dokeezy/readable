import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function PostPreview (props) {

  return (
    <div className="post-preview">
      <Link to={`/${props.post.category}/${props.post.id}`}>
        <h5>{props.post.title}</h5>
        <p>{props.post.body}</p>
        <p>Created by <b>{props.post.author}</b></p>
        <p>Current score : {props.post.voteScore}</p>
      </Link>
    </div>
  );
}

export default PostPreview;
