import React, { Component } from 'react';
import './BackBar.css'

class BackBar extends Component {
  constructor (props) {
    super(props)
    this.goBack = this.goBack.bind(this)
  }
  goBack (e) {
    console.log(window)
      // if (document.referrer !== '') {
      //   e.preventDefault()
      //   window.history.back()
      //   return false
      // }
    window.history.back()
    return false
  }
  render() {
    return (
      <div className="flex-r flex-c-s BackBar borderBottom">
        <div className="backIcon" onClick={(e) => this.goBack(e)}></div>
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}

export default BackBar
