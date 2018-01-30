import React, { Component } from 'react';
import BackBar from '../Partial/BackBar/index'
import { cCoords, loadMapScript, initMap, circleOverlay, initMyCircle, tagOverlay, initMyTag } from '../libs/qqMap'


class Map extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {
    
  }
  componentDidMount () {
    loadMapScript()
    console.log(this.props)
    window.init = function () {
      if (window.qq) {
        var myLatlng = cCoords(22.96, 113.744)
        var myOptions = {
          zoom: 10,
          center: myLatlng
        }
        initMap(myOptions, 'mapContainer')
      }
    }
  }
  render() {
    return (
      <div className="Map">
        <BackBar title="地图" />
        <div id="mapContainer" style={{'width': '100vw', 'height': '100vh'}}></div>
      </div>
    );
  }
}

export default Map;
