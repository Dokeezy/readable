import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCategories, getAllPosts, getCommentsByPost, voteForPost } from '../actions';
import { Link } from 'react-router-dom';
import * as API from '../utils/api.js';
import PostPreview from './PostPreview';
import ReactModal from 'react-modal'

class HomePage extends Component {

  constructor () {
    super();
    this.state = {
      sortedBy: 'date',
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  createPost(e) {
    const { title, author, category, body } = this.refs;
    e.preventDefault();
    if (title.value.length > 0 && author.value.length > 0 && category.value.length > 0 && body.value.length > 0) {
      console.log('Create post');
    }
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
        <div>
          <nav>
            <div>
              <h1>Readable</h1>
            </div>
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
              <button onClick={this.handleOpenModal}>Create Post</button>
                <ReactModal
                   isOpen={this.state.showModal}
                   contentLabel="Create a new post">
                   <form onSubmit={this.createPost}>
                     <input type="text" placeholder="Title" ref="title"/>
                     <input type="text" placeholder="Author" ref="author"/>
                     <select ref="category">
                       {this.props.categories.map(category => {
                         return <option key={category} value={category}>{category}</option>
                       })}
                     </select>
                     <textarea placeholder="Body" ref="body"/>
                     <button>Create</button>
                   </form>
                </ReactModal>
            </div>
          </nav>
        </div>
        <hr></hr>
        <div>
          <button>Create Post</button>
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
