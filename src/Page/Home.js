import React, { Component } from 'react';
import SearchBar from '../Partial/SearchBar/index'
import Slider from '../Partial/Slider/index'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slides: [
        {id: 1, src: process.env.PUBLIC_URL + '/img/slide1.jpg', url: 'http://www.baidu.com/'},
        {id: 2, src: process.env.PUBLIC_URL + '/img/slide2.jpg', url: 'http://www.baidu.com/'},
        {id: 3, src: process.env.PUBLIC_URL + '/img/slide3.jpg', url: 'http://www.baidu.com/'},
        {id: 4, src: process.env.PUBLIC_URL + '/img/slide4.jpg', url: 'http://www.baidu.com/'},
        {id: 5, src: process.env.PUBLIC_URL + '/img/slide5.jpg', url: 'http://www.baidu.com/'}
      ]
    }
  }
  render() {
    return (
      <div className="Home">
        <SearchBar />
        <Slider data={this.state.slides} />
      </div>
    );
  }
}

export default Home;
