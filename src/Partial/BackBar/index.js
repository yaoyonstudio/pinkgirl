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
    const BgColor = {
      'backgroundColor': this.props.bgcolor
    }
    const Color = {
      'color': this.props.color
    }
    return (
      <div className={this.props.noborder ? 'flex-r flex-c-s BackBar' : 'flex-r flex-c-s BackBar borderBottom'} style={this.props.bgcolor ? BgColor : {}}>
        <div className="backIcon" onClick={(e) => this.goBack(e)}></div>
        <h3 style={this.props.color ? Color : {}}>{this.props.title}</h3>
        {this.props.children}
      </div>
    );
  }
}

export default BackBar
