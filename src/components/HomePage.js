import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCategories, getAllPosts } from '../actions';
import { Link } from 'react-router-dom';
import * as API from '../utils/api.js';

class HomePage extends Component {

  componentDidMount() {
    this.props.getAllCategories();
    this.props.getAllPosts('react');
    API.getAllPosts().then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.categories.map((category, index) => {
            return (
              <li key={index} >
                <Link to="/category">
                  {category}
                </Link>
              </li>
            )
          })}
        </ul>
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
    getAllCategories: (data) => dispatch(getAllCategories(data)),
    getAllPosts: (data) => dispatch(getAllPosts(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
