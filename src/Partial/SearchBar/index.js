import React, { Component } from 'react';
import './SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '东莞'
    }
  }
  render() {
    return (
      <div className="flex-r flex-c-b SearchBar">
        <p>{this.state.city}</p>
        <span></span>
        <label>
          <input type="text" placeholder="请输入搜索关键词" />
        </label>
      </div>
    );
  }
} 

export default SearchBar
