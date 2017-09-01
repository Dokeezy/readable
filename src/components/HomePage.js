import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCategories } from '../actions';

class HomePage extends Component {

  componentDidMount() {
    this.props.getAllCategories();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.categories.map(category => {
            return <li>{category}</li>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
