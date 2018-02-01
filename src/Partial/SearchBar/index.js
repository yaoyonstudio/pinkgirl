import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getLocation } from '../../actions/common'

import './SearchBar.css'

const mapStateToProps = state => ({
  myLocation: state.common.myLocation
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getLocation
}, dispatch)

class SearchBar extends Component {
  componentDidMount () {
    this.props.getLocation()
  }
  render() {
    return (
      <div className="flex-r flex-c-b SearchBar">
        <p>{this.props.myLocation.city}</p>
        <span></span>
        <label>
          <input type="text" placeholder="请输入搜索关键词" />
        </label>
      </div>
    );
  }
} 

// export default SearchBar

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
