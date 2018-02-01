import React, { Component } from 'react';
import BackBar from '../Partial/BackBar/index'
import { cCoords, customMarker, createInfo, createLabel, poi, clearOverlays, loadMapScript, initMap, getPanorama, trafficLayer } from '../libs/qqMap'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

let map = {}
let myLatlng = {}
let markers = []
let traffic = {}

const mapStateToProps = state => ({
  myLocation: state.common.myLocation
})


class Map extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lat: 23.034980,
      lng: 113.780470,
      showZbControl: false,
      showStreetView: false,
      showTrafficLayer: false,
      zb: [
        {id: 1, title: '教育', img: process.env.PUBLIC_URL + '/img/zb/zb_icon1.png'},
        {id: 2, title: '交通', img: process.env.PUBLIC_URL + '/img/zb/zb_icon2.png'},
        {id: 3, title: '医院', img: process.env.PUBLIC_URL + '/img/zb/zb_icon3.png'},
        {id: 4, title: '购物', img: process.env.PUBLIC_URL + '/img/zb/zb_icon4.png'},
        {id: 5, title: '餐饮', img: process.env.PUBLIC_URL + '/img/zb/zb_icon5.png'}
      ]
    }
    this.toggleZb = this.toggleZb.bind(this)
    this.toggleView = this.toggleView.bind(this)
  }
  toggleView (type) {
    if (!type) return false
    switch (type) {
      case 'zb':
        this.setState({
          showZbControl: !this.state.showZbControl,
        })
        break
      case 'traffic':
        this.setState({
          showTrafficLayer: !this.state.showTrafficLayer,
        })
        if (!this.state.showTrafficLayer) {
          traffic = trafficLayer(map)
        } else {
          traffic.setMap(null)
        }
      default:
        break
    }
  }
  toggleZb (type) {
    console.log('type:', type)
    poi(markers, map, {type: type.id, keyword: type.title}, myLatlng, 2)
  }
  componentWillMount () {
    
  }
  componentDidMount () {
    let that = this
    loadMapScript()
    console.log(this.props)
    window.init = function () {
      if (window.qq) {
        myLatlng = cCoords(that.state.lat, that.state.lng)
        var myOptions = {
          zoom: 16,
          center: myLatlng
        }
        map = initMap(myOptions, 'mapContainer')
        customMarker(map, myLatlng, '我的位置')
        // createInfo(map, myLatlng, '<span style="font-size: 14px; margin-right: 10px;">我的位置</span>')
        createLabel(map, myLatlng, '我的位置')
      }
    }
  }
  render() {
    return (
      <div className="Map">
        <BackBar title="地图" />
        <div id="mapContainer" className="mapContainer"></div>
        {/* <div id="HouseView_content" className="HouseView_content"></div> */}
        {this.state.showZbControl &&
          <section className="MapZb">
            <ul>
              {this.state.zb.map((item, index) => <li onClick={() => this.toggleZb(item)} className="flex-r flex-c-s" key={index}><img src={item.img} alt={item.title} /><span>{item.title}</span></li>)}
            </ul>
          </section>
        }
        <footer className="MapNav">
          <ul className="flex-r flex-c-c">
            <li onClick={() => this.toggleView('zb')}><span className={this.state.showZbControl ? 'active' : ''}>周边</span></li>
            <li><Link to="/street"><span>街景</span></Link></li>
            <li><Link to="/routes"><span>路线导航</span></Link></li>
            <li onClick={() => this.toggleView('traffic')}><span>实时路况</span></li>
            <li><span>公交换乘</span></li>
          </ul>
        </footer>
      </div>
    );
  }
}

// export default Map;
export default connect(mapStateToProps)(Map)
