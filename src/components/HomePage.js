import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPosts, getCommentsByPost, voteForPost } from '../actions';
import PostPreview from './PostPreview';
import Header from './Header';

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
        <Header title="Readable" />
        <hr></hr>
        <div>
          <p>Sort posts by :</p>
          <select onChange={(e) => {
            this.setState({ sortedBy: e.target.value });
          }} value={this.state.sortedBy}>
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
          </select>
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
            return <PostPreview voteForPost={this.props.voteForPost} commentsNumber={commentsNumber} post={post} key={post.id} />
          })}
        </div>

      </div>
    );
  }
}

function mapStateToProps ({ categories, posts, comments }) {
  return {
    categories: Object.keys(categories),
    posts: Object.values(posts).filter(post => {
      return post.deleted === false;
    }),
    comments: Object.values(comments)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllPosts: () => dispatch(getAllPosts()),
    getCommentsByPost: (postId) => dispatch(getCommentsByPost(postId)),
    voteForPost: (postId, voteType) => dispatch(voteForPost(postId, voteType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
