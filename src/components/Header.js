import React, { Component } from 'react';
import ReactModal from 'react-modal';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';
import { createNewPost } from '../actions';
import { Link } from 'react-router-dom';

class Header extends Component {

  constructor () {
    super();

    this.state = {
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
    e.preventDefault();

    const { title, author, category, body } = this.refs;

    if (title.value.length > 0 && author.value.length > 0 && category.value.length > 0 && body.value.length > 0) {
      this.props.createNewPost({
        id: uuidv4(),
        timestamp: Date.now(),
        title: title.value,
        body: body.value,
        author: author.value,
        category: category.value
      }).then(() => {
        this.handleCloseModal();
      });
    }
  }

  render() {
    return (
      <div>
        <nav>
          <div>
            <h1>{this.props.title}</h1>
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
            <button onClick={this.handleOpenModal} className="button">Create Post</button>
              <ReactModal
                 isOpen={this.state.showModal}
                 contentLabel="Create a new post">
                 <form onSubmit={(e) => {this.createPost(e)}}>
                   <input type="text" placeholder="Title" ref="title"/><br />
                   <input type="text" placeholder="Author" ref="author"/><br />
                   <select ref="category">
                     {this.props.categories.map(category => {
                       return <option key={category} value={category}>{category}</option>
                     })}
                   </select><br />
                   <textarea placeholder="Body" ref="body"/><br />
                   <button>Create</button>
                 </form>
                 <button onClick={this.handleCloseModal}>Cancel</button>
              </ReactModal>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps ({ categories, posts, comments }) {
  return {
    categories: Object.keys(categories)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createNewPost: (post) => dispatch(createNewPost(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
