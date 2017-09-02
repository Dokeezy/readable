import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostPreview from './PostPreview';
import { getPostsByCategory } from '../actions';


class CategoryPage extends Component {

  state = {
    sortedBy: 'date'
  }

  componentDidMount() {
    if (Object.keys(this.props.posts).length === 0) {
      this.props.getPostsByCategory(this.props.match.params.category);
    }
  }

  render() {
    return (
      <div>
          <div>
            <nav>
              <div>
                <h1>{this.props.match.params.category}</h1>
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
            </nav>
          </div>
          <hr></hr>
          <div>
            {this.props.posts.sort((a, b) => {
              if (this.state.sortedBy === 'popularity') {
                return b.voteScore - a.voteScore;
              }
              if (this.state.sortedBy === 'date') {
                return b.timestamp - a.timestamp;
              }
            }).map(post => {
              return <PostPreview post={post} key={post.id} />
            })}
          </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getPostsByCategory: (data) => dispatch(getPostsByCategory(data))
  }
}


function mapStateToProps ({ categories, posts }) {
  const categoryName = window.location.pathname.split('/')[1];

  return {
    categories: Object.keys(categories),
    posts: Object.values(posts).filter(post => {
      return post.category === categoryName;
    })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryPage);
