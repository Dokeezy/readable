import React, { Component } from 'react';
import * as API from './utils/api.js';

class App extends Component {

  componentDidMount() {
    API.getAllPosts().then(data => {
      console.log(data);
    });

    API.updatePost('8xf0y6ziyjabvozdd253nd', 'A Brand new title', 'And a brand new body').then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        Hello World !
      </div>
    );
  }
}

export default App;
