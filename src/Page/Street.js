import React, { Component } from 'react';
import BackBar from '../Partial/BackBar/index'
import { cCoords, customMarker, createInfo, createLabel, poi, clearOverlays, loadMapScript, initMap, getPanorama } from '../libs/qqMap'

class Street extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lat: 23.034980,
      lng: 113.780470
    }
  }
  componentWillMount () {
    
  }
  componentDidMount () {
    let that = this
    loadMapScript(() => {
      window.init = function () {
        if (window.qq) {
          if (that.state.lat && that.state.lng) {
            getPanorama('HouseView_content', that.state.lat, that.state.lng)
          }
        }
      }
    })
  }
  render() {
    return (
      <div className="Map">
        <BackBar title="地图街景" />
        <div id="HouseView_content" className="HouseView_content"></div>
      </div>
    );
  }
}

export default Street;
