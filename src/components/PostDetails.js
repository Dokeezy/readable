import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class PostDetails extends Component {

  render() {
    return (
      <div>
          <div>
            <nav>
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
            </nav>
          </div>
          <hr></hr>
          <div>
            Current post : {this.props.match.params.postId}
          </div>
      </div>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories: Object.keys(categories)
  }
}

export default connect(
  mapStateToProps
)(PostDetails);
