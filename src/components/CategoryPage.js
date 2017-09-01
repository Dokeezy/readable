import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CategoryPage extends Component {

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
            </nav>
          </div>
          <hr></hr>
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
)(CategoryPage);
