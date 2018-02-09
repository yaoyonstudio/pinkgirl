/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import  $ from  'jquery'

import { cCoords, unzipCoords, Polyline, customMarker, createInfo, createLabel, loadMapScript, initMap } from '../libs/qqMap'

import {ShowToast } from '../libs/keact'
import { QQ_KEY } from '../config'
import { connect } from 'react-redux'

function getQueryString (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

let map = {}
let myLatlng = {}

const mapStateToProps = state => ({
  myLocation: state.common.myLocation
})

function cb (res) {
  console.log(res)
}

class Routes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      routes: [],
      currentSelect: '',
      currentRoute: {},
      method: 0,
      myPos: {
        name: '我的位置',
        lat: 23.034980,
        lng: 113.780470,
        latlng: ' '
      },
      startPos: {
        name: ''
      },
      endPos: {
        name: ''
      },
      showDetail: false
    }
    this.toggleMethod = this.toggleMethod.bind(this)
    this.setLocation = this.setLocation.bind(this)
    this.toggleRouteDetail = this.toggleRouteDetail.bind(this)
    this.changeCurrentRoute = this.changeCurrentRoute.bind(this)
  }
  changeCurrentRoute (route) {
    this.setState({
      currentRoute: route
    }, () => {
      if (this.state.method === 3) {
        this.drawBus(route)
      }
    })
  }
  toggleRouteDetail () {
    this.setState({
      showDetail: !this.state.showDetail
    })
  }
  toggleMethod (type) {
    console.log('选择路线方式：', type)
    if (!this.state.startPos.latlng || !this.state.endPos.latlng) {
      ShowToast('请选择起点和终点')
      return false
    }
    let that = this
    this.setState({
      method: type
    })
    let url = ''
    switch (type) {
      case 1:
        url = `https://apis.map.qq.com/ws/direction/v1/driving/?from=${this.state.startPos.latlng}&to=${this.state.endPos.latlng}&output=jsonp&callback=?&key=${QQ_KEY}`
        break
      case 2:
        url = `https://apis.map.qq.com/ws/direction/v1/walking/?from=${this.state.startPos.latlng}&to=${this.state.endPos.latlng}&output=jsonp&callback=?&key=${QQ_KEY}`
        break
      case 3:
        url = `https://apis.map.qq.com/ws/direction/v1/transit/?from=${this.state.startPos.latlng}&to=${this.state.endPos.latlng}&policy=LEAST_TIME&output=jsonp&callback=?&key=${QQ_KEY}`
        break
      default:
        break
    }

    $(document).ready (function () {
      $.ajax({
        type: 'get',
        async: false,
        url: url,
        dataType: 'jsonp',
        jsonpCallback: 'callback',
        success: function (res) {
          console.log('res:', res)
          if (res.status === 0) {
            if (res.result && res.result.routes && res.result.routes.length) {
              that.setState({
                routes: res.result.routes,
                currentRoute: res.result.routes[0]
              })
              if (res.result.routes[0].polyline) {
                that.drawDriving(res.result.routes[0].polyline)
              }
              // 对于公交线路特别处理
              if (type === 3) {
                that.drawBus(res.result.routes[0])
              }
            }
          } else {
            ShowToast('请求路线出现错误')
          }
        },
        error: function (error) {
          console.log(error)
        }
      })
    })

  }
  setLocation (type) {
    // if (type === 'start') {
      // window.location.href = `https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=${URL}/routes?type=start&key=${QQ_KEY}&referer=myapp`

      // console.log(window.document.body)

    this.setState({
      currentSelect: 'start'
    }, () => {

    })

    var iframe = document.createElement('iframe')
    iframe.setAttribute('id', 'mapPage')
    iframe.setAttribute('width', '100%')
    iframe.setAttribute('height', '100%')
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('style', 'position: fixed; top: 0; left: 0;')
    iframe.setAttribute('src', `http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=${QQ_KEY}&referer=myapp`)

    // } else if (type === 'end') {
    //   window.location.href = `https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=${URL}/routes?type=end&key=${QQ_KEY}&referer=myapp`
    // }

    this.setState({
      currentSelect: type
    }, () => {
      window.document.body.appendChild(iframe)
    })



  }

  drawDriving (path) {
    if (!path) return false
    let coords = unzipCoords(path)
    createInfo(map, coords[0], '<span style="font-size: 12px; margin-right: 10px;">起点</span>')
    createInfo(map, coords[coords.length - 1], '<span style="font-size: 12px; margin-right: 10px;">终点</span>')
    Polyline(map, coords)
  }

  drawBus (busPath) {
    if (!busPath) return false
    // console.log('busPath:', busPath)
    if (busPath.steps && busPath.steps.length) {
      // createInfo(map, busPath.steps[0], '<span style="font-size: 12px; margin-right: 10px;">起点</span>')
      // createInfo(map, busPath.steps[busPath.steps.length - 1], '<span style="font-size: 12px; margin-right: 10px;">终点</span>')

      let allCoords = []
      busPath.steps.map((path, index) => {
        if (path.mode === 'WALKING') {
          if (path.polyline) {
            allCoords.push(unzipCoords(path.polyline))
          }
        } else if (path.mode === 'TRANSIT') {
          if (path.lines && path.lines.length) {
            path.lines.map((line, i) => {
              if (line.polyline && line.polyline.length) {
                allCoords.push(unzipCoords(line.polyline))
              }
            })
          }
        }
      })

      // console.log(allCoords)
      let coords = []
      if (allCoords.length) {
        allCoords.map(item => {
          if (item.length) {
            item.map(subItem => {
              coords.push(subItem)
            })
          }
        })
      }
      // console.log(coords)
      Polyline(map, allCoords[1])
      createInfo(map, coords[0], '<span style="font-size: 12px; margin-right: 10px;">起点</span>')
      createInfo(map, coords[coords.length - 1], '<span style="font-size: 12px; margin-right: 10px;">终点</span>')
    }
  }

  componentDidMount () {
    console.log(this.props.myLocation)

    if (localStorage.getItem('startPos')) {
      this.setState({
        startPos: JSON.parse(localStorage.getItem('startPos'))
      })
    } else {
      this.setState({
        startPos: this.state.myPos
      })
    }

    if (localStorage.getItem('endPos')) {
      this.setState({
        endPos: JSON.parse(localStorage.getItem('endPos'))
      })
    }
    
    
    let that = this
    loadMapScript()
    window.init = function () {
      if (window.qq) {
        myLatlng = cCoords(that.state.myPos.lat, that.state.myPos.lng)
        var myOptions = {
          zoom: 14,
          center: myLatlng,
          zoomControl: true,
          zoomControlOptions: {
            position: window.qq.maps.ControlPosition.LEFT_TOP
          }
        }
        map = initMap(myOptions, 'mapContainer')
        customMarker(map, myLatlng, '我的位置')
        // createInfo(map, myLatlng, '<span style="font-size: 14px; margin-right: 10px;">我的位置</span>')
        createLabel(map, myLatlng, '我的位置')
      }
    }


    let selectType = getQueryString('type')
    if (selectType === 'start') {
      this.setState({
        startPos: {
          name: getQueryString('name'),
          latlng: getQueryString('latng'),
          addr: getQueryString('addr'),
          city: getQueryString('city')
        }
      }, () => {
        localStorage.setItem('startPos', JSON.stringify(this.state.startPos))
      })
    } else if (selectType === 'end') {
      this.setState({
        endPos: {
          name: getQueryString('name'),
          latlng: getQueryString('latng'),
          addr: getQueryString('addr'),
          city: getQueryString('city')
        }
      }, () => {
        localStorage.setItem('endPos', JSON.stringify(this.state.endPos))
      })
    }
    console.log('startPos:', this.state.startPos)
    console.log('endPos:', this.state.endPos)


    window.addEventListener('message', function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module === 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          console.log('location', loc);
          if (that.state.currentSelect === 'start') {
            console.log('开始位置')
            that.setState({
              startPos: {
                name: loc.poiname,
                latlng: loc.latlng.lat + ',' + loc.latlng.lng,
                addr: loc.poiaddress,
                city: loc.cityname,
                latlngObj: loc.latlng
              }
            }, () => {
              localStorage.setItem('startPos', JSON.stringify(that.state.startPos))
            })
          } else {
            console.log('目的位置')
            that.setState({
              endPos: {
                name: loc.poiname,
                latlng: loc.latlng.lat + ',' + loc.latlng.lng,
                addr: loc.poiaddress,
                city: loc.cityname,
                latlngObj: loc.latlng
              }
            }, () => {
              localStorage.setItem('endPos', JSON.stringify(that.state.endPos))
            })
          }
          document.querySelector('#mapPage').remove()
        }                                
    }, false); 







  }
  render() {
    return (
      <div className="Map">
        <div id="mapContainer" className="mapContainer RouteMap"></div>
        <header className="routesPlan">
          <nav>
            <ul className="flex-r flex-c-c">
              <li onClick={() => this.toggleMethod(1)} className={this.state.method === 1 ? 'flexItem active': 'flexItem'}>驾车</li>
              <li onClick={() => this.toggleMethod(2)} className={this.state.method === 2 ? 'flexItem active': 'flexItem'}>步行</li>
              <li onClick={() => this.toggleMethod(3)} className={this.state.method === 3 ? 'flexItem active': 'flexItem'}>公交</li>
            </ul>
          </nav>
          <form className="flex-r flex-c-b">
            <label className="flexItem flex-r flex-c-s"><span>从</span><input type="text" placeholder="起点" onClick={() => this.setLocation('start')} value={this.state.startPos.name} readOnly /></label>
            <label className="flexItem flex-r flex-c-s"><span>到</span><input type="text" placeholder="终点" onClick={() => this.setLocation('end')} value={this.state.endPos.name} readOnly /></label>
          </form>
        </header>
        {this.state.routes.length ? <footer className={this.state.showDetail ? 'flex-c flex-s-s routesPath fullHeight' : 'routesPath'}>
          <div className="moreLessBar" onClick={() => this.toggleRouteDetail()}><img className={this.state.showDetail ? 'less' : 'more'} src={`${process.env.PUBLIC_URL}/img/arrow.svg`} alt="" /></div>
          <ul className="flex-r flex-s-c route">
            {this.state.routes.map((route, index) => {
              return (
                <li key={index} className={route === this.state.currentRoute ? 'active' : ''} onClick={() => this.changeCurrentRoute(route)}>
                  <h4>路线{index + 1}</h4>
                  <p>{route.duration}分钟</p>
                  <p>{route.distance}米</p>
                </li>
              )
            })}
          </ul>
          {this.state.currentRoute.steps && <ul className="steps">
            {this.state.currentRoute.steps.map((step, index) => {
              if (this.state.method === 1 || this.state.method === 2) {
                return (
                  <li key={index}>
                    <span>●</span>
                    <h4>{step.road_name}</h4>
                    <p>{step.instruction}</p>
                  </li>
                )
              } else if (this.state.method === 3) {
                let busLines = ''
                if (step.mode === 'TRANSIT') {
                  if (step.lines && step.lines.length) {
                    step.lines.map((line, i) => {
                      busLines += '乘坐' + line.title + '路车，途经' + line.station_count + '站' + (i < step.lines.length - 1 ? '或' : '')
                    })
                  }
                }

                return (
                  <li key={index}>
                    <span>●</span>
                    <h4>{(step.mode === 'WALKING') ? '步行 ' : (step.mode === 'TRANSIT' ? '公交' : '') }</h4>
                    {step.mode === 'WALKING' && <p>向{step.direction}行走{step.distance}米(约{step.duration}分钟)</p>}
                    {busLines}
                    {/* {step.mode === 'TRANSIT' && <p>乘坐
                    {step.lines.map((line, i) => {
                      return (
                        {line.title}路车到{line.stations[line.stations.length - 1].title}，共{line.stations.length}站，约{line.duration}分钟
                      )
                    }}
                    </p>} */}
                  </li>
                )
              }
            })}
          </ul>}
        </footer> : ''}
      </div>
    );
  }
}

// export default Routes;
export default connect(mapStateToProps)(Routes)


