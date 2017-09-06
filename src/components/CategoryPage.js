import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostPreview from './PostPreview';
import Header from './Header';
import { getPostsByCategory } from '../actions/posts_actions';
import { getCommentsByPost } from '../actions/comments_actions';

class CategoryPage extends Component {

  state = {
    sortedBy: 'date'
  }

  componentDidMount() {
    this.props.getPostsByCategory(this.props.match.params.category).then((data) => {
      data.posts.forEach(post => {
        this.props.getCommentsByPost(post.id);
      });
    });
  }

  render() {
    return (
      <div>
          <Header title={this.props.match.params.category} />
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
              return <PostPreview commentsNumber={commentsNumber} post={post} key={post.id} />
            })}
          </div>
      </div>
    );
  }
}

function mapStateToProps ({ categories, posts, comments }, ownProps) {

  return {
    categories: Object.keys(categories),
    posts: Object.values(posts).filter(post => {
      return post.category === ownProps.match.params.category;
    }),
    comments: Object.values(comments)
  }
}

export default connect(
  mapStateToProps,
  { getCommentsByPost, getPostsByCategory }
)(CategoryPage);
