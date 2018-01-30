import React, { Component } from 'react';
import './style.css';
import Routers from './Routers'

class App extends Component {
  componentWillMount () {
    console.log(this.props)
  }
  render() {
    return (
      <Routers {...this.props} />
    );
  }
}

export default App;
