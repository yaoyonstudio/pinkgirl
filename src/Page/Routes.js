import React, { Component } from 'react';
import BackBar from '../Partial/BackBar/index'
import  $ from  'jquery'

import { searchPlace, cCoords, customMarker, createInfo, createLabel, poi, clearOverlays, loadMapScript, initMap, getPanorama } from '../libs/qqMap'

import { Ajax, Helper } from '../libs/keact'
import { QQ_KEY, URL } from '../config'


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function getQueryString (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

let map = {}
let myLatlng = {}
let markers = []
let traffic = {}

let res = {
  "routes": [
    {
        "mode": "DRIVING",
        "distance": 7280,
        "duration": 21,
        "polyline": [
            23.034751,
            113.782563,
            -91,
            107,
            0,
            0,
            -1760,
            -1960,
            0,
            0,
            -220,
            -250,
            -180,
            -180,
            0,
            0,
            -40,
            -70,
            0,
            0,
            -400,
            -400,
            0,
            0,
            -1700,
            -1770,
            0,
            0,
            500,
            -850,
            0,
            0,
            260,
            -440,
            0,
            0,
            230,
            -500,
            100,
            -330,
            0,
            0,
            -80,
            -200,
            -670,
            -380,
            -2480,
            -1570,
            0,
            0,
            -450,
            -280,
            -830,
            -470,
            -1390,
            -850,
            0,
            0,
            -480,
            -310,
            -1790,
            -1320,
            -1300,
            -1040,
            -550,
            -420,
            -1380,
            -1410,
            -230,
            -300,
            -86,
            -72,
            -745,
            -826,
            -649,
            -680,
            -250,
            -242,
            -1680,
            -1740,
            -1080,
            -1050,
            -950,
            -780,
            -400,
            -310,
            -1480,
            -1100,
            -670,
            -450,
            -150,
            -130,
            -1040,
            -780,
            -210,
            -130,
            -460,
            -360,
            -2280,
            -1670,
            -890,
            -680,
            -3050,
            -2250,
            0,
            0,
            -410,
            -610,
            -360,
            -270,
            0,
            0,
            -350,
            -1040,
            -200,
            -1000,
            -80,
            -640,
            480,
            -980,
            400,
            -750,
            60,
            -150,
            310,
            -550,
            510,
            -1040,
            510,
            -980,
            380,
            -790,
            640,
            -1390,
            490,
            -920,
            300,
            -620,
            1400,
            -2770,
            50,
            -120,
            0,
            0,
            510,
            -960,
            510,
            -1070,
            0,
            0,
            -30,
            -170,
            -1420,
            -800,
            -2040,
            -1240,
            -380,
            -250,
            -430,
            -260,
            0,
            0,
            114,
            -126
        ],
        "steps": [
            {
                "instruction": "沿东纵路向东南行驶14米,右转",
                "polyline_idx": [
                    0,
                    3
                ],
                "road_name": "东纵路",
                "dir_desc": "东南",
                "distance": 14,
                "act_desc": "右转",
                "accessorial_desc": ""
            },
            {
                "instruction": "沿东盛街向西南行驶674米,右转",
                "polyline_idx": [
                    4,
                    25
                ],
                "road_name": "东盛街",
                "dir_desc": "西南",
                "distance": 674,
                "act_desc": "右转",
                "accessorial_desc": ""
            },
            {
                "instruction": "沿东城路向西北行驶249米,左转",
                "polyline_idx": [
                    26,
                    39
                ],
                "road_name": "东城路",
                "dir_desc": "西北",
                "distance": 249,
                "act_desc": "左转",
                "accessorial_desc": ""
            },
            {
                "instruction": "沿东城中路向西南行驶3.8公里,偏右转出主路",
                "polyline_idx": [
                    40,
                    103
                ],
                "road_name": "东城中路",
                "dir_desc": "西南",
                "distance": 3825,
                "act_desc": "偏右转",
                "accessorial_desc": "出主路"
            },
            {
                "instruction": "沿东莞大道辅道向西南行驶126米,偏右转进入匝道",
                "polyline_idx": [
                    104,
                    109
                ],
                "road_name": "东莞大道辅道",
                "dir_desc": "西南",
                "distance": 126,
                "act_desc": "偏右转",
                "accessorial_desc": "进入匝道"
            },
            {
                "instruction": "沿三元路向西北行驶1.6公里,偏左转不要下坡",
                "polyline_idx": [
                    110,
                    141
                ],
                "road_name": "三元路",
                "dir_desc": "西北",
                "distance": 1574,
                "act_desc": "偏左转",
                "accessorial_desc": "不要下坡"
            },
            {
                "instruction": "沿三元路向西北行驶237米,左转",
                "polyline_idx": [
                    142,
                    147
                ],
                "road_name": "三元路",
                "dir_desc": "西北",
                "distance": 237,
                "act_desc": "左转",
                "accessorial_desc": ""
            },
            {
                "instruction": "沿莞太路向西南行驶559米,右转",
                "polyline_idx": [
                    148,
                    159
                ],
                "road_name": "莞太路",
                "dir_desc": "西南",
                "distance": 559,
                "act_desc": "右转",
                "accessorial_desc": ""
            },
            {
                "instruction": "沿南城富民商业步行街向西北行驶18米,到达目的地",
                "polyline_idx": [
                    160,
                    163
                ],
                "road_name": "南城富民商业步行街",
                "dir_desc": "西北",
                "distance": 18,
                "act_desc": "",
                "accessorial_desc": "到达目的地"
            }
        ],
        "tags": [
            "RECOMMEND"
        ],
        "taxi_fare": {
            "fare": 21
        }
    }
  ]
}

let currentRoute = res.routes[0]

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
    this.changeStart = this.changeStart.bind(this)
    this.changeEnd = this.changeEnd.bind(this)
    this.setLocation = this.setLocation.bind(this)
    this.toggleRouteDetail = this.toggleRouteDetail.bind(this)
  }
  componentWillMount () {
    
  }
  toggleRouteDetail () {
    this.setState({
      showDetail: !this.state.showDetail
    })
  }
  toggleMethod (type) {
    console.log('选择路线方式：', type)
    this.setState({
      method: type
    })
    let url = ''
    switch (type) {
      case 1:
        url = `https://apis.map.qq.com/ws/direction/v1/driving/?from=${this.state.startPos.latlng}&to=${this.state.endPos.latlng}&output=jsonp&callback=?&key=${QQ_KEY}`
        break
      case 2:
        url = `https://apis.map.qq.com/ws/direction/v1/walking/?from=${this.state.startPos.latlng}&to=${this.state.endPos.latlng}&key=${QQ_KEY}`
        break
      case 3:
        url = `https://apis.map.qq.com/ws/direction/v1/transit/?from=${this.state.startPos.latlng}&to=${this.state.endPos.latlng}&policy=LEAST_TIME&output=json&callback=callback_function&key=${QQ_KEY}`
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
        success: function (json) {
          console.log('data:', json)
        },
        error: function (error) {
          console.log(error)
        }
      })
    })

    // Ajax(url, 'GET', {}, (res) => {
    //   console.log(res)
    // }, (error) => {
    //   console.log(error)
    // })

    let test1 = {
      "status": 0,
      "message": "query ok",
      "result": {
          "routes": [
              {
                  "mode": "DRIVING",
                  "distance": 7280,
                  "duration": 21,
                  "polyline": [
                      23.034751,
                      113.782563,
                      -91,
                      107,
                      0,
                      0,
                      -1760,
                      -1960,
                      0,
                      0,
                      -220,
                      -250,
                      -180,
                      -180,
                      0,
                      0,
                      -40,
                      -70,
                      0,
                      0,
                      -400,
                      -400,
                      0,
                      0,
                      -1700,
                      -1770,
                      0,
                      0,
                      500,
                      -850,
                      0,
                      0,
                      260,
                      -440,
                      0,
                      0,
                      230,
                      -500,
                      100,
                      -330,
                      0,
                      0,
                      -80,
                      -200,
                      -670,
                      -380,
                      -2480,
                      -1570,
                      0,
                      0,
                      -450,
                      -280,
                      -830,
                      -470,
                      -1390,
                      -850,
                      0,
                      0,
                      -480,
                      -310,
                      -1790,
                      -1320,
                      -1300,
                      -1040,
                      -550,
                      -420,
                      -1380,
                      -1410,
                      -230,
                      -300,
                      -86,
                      -72,
                      -745,
                      -826,
                      -649,
                      -680,
                      -250,
                      -242,
                      -1680,
                      -1740,
                      -1080,
                      -1050,
                      -950,
                      -780,
                      -400,
                      -310,
                      -1480,
                      -1100,
                      -670,
                      -450,
                      -150,
                      -130,
                      -1040,
                      -780,
                      -210,
                      -130,
                      -460,
                      -360,
                      -2280,
                      -1670,
                      -890,
                      -680,
                      -3050,
                      -2250,
                      0,
                      0,
                      -410,
                      -610,
                      -360,
                      -270,
                      0,
                      0,
                      -350,
                      -1040,
                      -200,
                      -1000,
                      -80,
                      -640,
                      480,
                      -980,
                      400,
                      -750,
                      60,
                      -150,
                      310,
                      -550,
                      510,
                      -1040,
                      510,
                      -980,
                      380,
                      -790,
                      640,
                      -1390,
                      490,
                      -920,
                      300,
                      -620,
                      1400,
                      -2770,
                      50,
                      -120,
                      0,
                      0,
                      510,
                      -960,
                      510,
                      -1070,
                      0,
                      0,
                      -30,
                      -170,
                      -1420,
                      -800,
                      -2040,
                      -1240,
                      -380,
                      -250,
                      -430,
                      -260,
                      0,
                      0,
                      114,
                      -126
                  ],
                  "steps": [
                      {
                          "instruction": "沿东纵路向东南行驶14米,右转",
                          "polyline_idx": [
                              0,
                              3
                          ],
                          "road_name": "东纵路",
                          "dir_desc": "东南",
                          "distance": 14,
                          "act_desc": "右转",
                          "accessorial_desc": ""
                      },
                      {
                          "instruction": "沿东盛街向西南行驶674米,右转",
                          "polyline_idx": [
                              4,
                              25
                          ],
                          "road_name": "东盛街",
                          "dir_desc": "西南",
                          "distance": 674,
                          "act_desc": "右转",
                          "accessorial_desc": ""
                      },
                      {
                          "instruction": "沿东城路向西北行驶249米,左转",
                          "polyline_idx": [
                              26,
                              39
                          ],
                          "road_name": "东城路",
                          "dir_desc": "西北",
                          "distance": 249,
                          "act_desc": "左转",
                          "accessorial_desc": ""
                      },
                      {
                          "instruction": "沿东城中路向西南行驶3.8公里,偏右转出主路",
                          "polyline_idx": [
                              40,
                              103
                          ],
                          "road_name": "东城中路",
                          "dir_desc": "西南",
                          "distance": 3825,
                          "act_desc": "偏右转",
                          "accessorial_desc": "出主路"
                      },
                      {
                          "instruction": "沿东莞大道辅道向西南行驶126米,偏右转进入匝道",
                          "polyline_idx": [
                              104,
                              109
                          ],
                          "road_name": "东莞大道辅道",
                          "dir_desc": "西南",
                          "distance": 126,
                          "act_desc": "偏右转",
                          "accessorial_desc": "进入匝道"
                      },
                      {
                          "instruction": "沿三元路向西北行驶1.6公里,偏左转不要下坡",
                          "polyline_idx": [
                              110,
                              141
                          ],
                          "road_name": "三元路",
                          "dir_desc": "西北",
                          "distance": 1574,
                          "act_desc": "偏左转",
                          "accessorial_desc": "不要下坡"
                      },
                      {
                          "instruction": "沿三元路向西北行驶237米,左转",
                          "polyline_idx": [
                              142,
                              147
                          ],
                          "road_name": "三元路",
                          "dir_desc": "西北",
                          "distance": 237,
                          "act_desc": "左转",
                          "accessorial_desc": ""
                      },
                      {
                          "instruction": "沿莞太路向西南行驶559米,右转",
                          "polyline_idx": [
                              148,
                              159
                          ],
                          "road_name": "莞太路",
                          "dir_desc": "西南",
                          "distance": 559,
                          "act_desc": "右转",
                          "accessorial_desc": ""
                      },
                      {
                          "instruction": "沿南城富民商业步行街向西北行驶18米,到达目的地",
                          "polyline_idx": [
                              160,
                              163
                          ],
                          "road_name": "南城富民商业步行街",
                          "dir_desc": "西北",
                          "distance": 18,
                          "act_desc": "",
                          "accessorial_desc": "到达目的地"
                      }
                  ],
                  "tags": [
                      "RECOMMEND"
                  ],
                  "taxi_fare": {
                      "fare": 21
                  }
              }
          ]
      }
    }


  }
  setLocation (type) {
    if (type === 'start') {
      window.location.href = `https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=${URL}/routes?type=start&key=${QQ_KEY}&referer=myapp`
    } else if (type === 'end') {
      window.location.href = `https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=${URL}/routes?type=end&key=${QQ_KEY}&referer=myapp`
    }
  }
  changeStart (e) {
    console.log('change start value')
    console.log(e.target.value)
    searchPlace(this.props.myLocation.city, e.target.value, (res) => {
      console.log('搜索结果：', res)
    }, (error) => {
      console.log('搜索错误：', error)
    })
  }
  changeEnd (e) {
    console.log('change end value')
    console.log(e.target.value)
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
          center: myLatlng
        }
        map = initMap(myOptions, 'mapContainer')
        customMarker(map, myLatlng, '我的位置')
        // createInfo(map, myLatlng, '<span style="font-size: 14px; margin-right: 10px;">我的位置</span>')
        createLabel(map, myLatlng, '我的位置')
        
    
        let path = [
            23.034751,
            113.782563,
            -91,
            107,
            0,
            0,
            -1760,
            -1960,
            0,
            0,
            -220,
            -250,
            -180,
            -180,
            0,
            0,
            -40,
            -70,
            0,
            0,
            -400,
            -400,
            0,
            0,
            -1700,
            -1770,
            0,
            0,
            500,
            -850,
            0,
            0,
            260,
            -440,
            0,
            0,
            230,
            -500,
            100,
            -330,
            0,
            0,
            -80,
            -200,
            -670,
            -380,
            -2480,
            -1570,
            0,
            0,
            -450,
            -280,
            -830,
            -470,
            -1390,
            -850,
            0,
            0,
            -480,
            -310,
            -1790,
            -1320,
            -1300,
            -1040,
            -550,
            -420,
            -1380,
            -1410,
            -230,
            -300,
            -86,
            -72,
            -745,
            -826,
            -649,
            -680,
            -250,
            -242,
            -1680,
            -1740,
            -1080,
            -1050,
            -950,
            -780,
            -400,
            -310,
            -1480,
            -1100,
            -670,
            -450,
            -150,
            -130,
            -1040,
            -780,
            -210,
            -130,
            -460,
            -360,
            -2280,
            -1670,
            -890,
            -680,
            -3050,
            -2250,
            0,
            0,
            -410,
            -610,
            -360,
            -270,
            0,
            0,
            -350,
            -1040,
            -200,
            -1000,
            -80,
            -640,
            480,
            -980,
            400,
            -750,
            60,
            -150,
            310,
            -550,
            510,
            -1040,
            510,
            -980,
            380,
            -790,
            640,
            -1390,
            490,
            -920,
            300,
            -620,
            1400,
            -2770,
            50,
            -120,
            0,
            0,
            510,
            -960,
            510,
            -1070,
            0,
            0,
            -30,
            -170,
            -1420,
            -800,
            -2040,
            -1240,
            -380,
            -250,
            -430,
            -260,
            0,
            0,
            114,
            -126
        ]

        for (var i = 2; i < path.length; i++) {
          path[i] = path[i-2] + path[i]/1000000
        }

        let lines = []

        for (let i = 0; i < path.length; i+=2) {
          lines.push(new window.qq.maps.LatLng(path[i], path[i+1]))
        }

        console.log(lines)

        // var path = [
        //     new window.qq.maps.LatLng(39.910, 116.399),
        //     new window.qq.maps.LatLng(39.920, 116.405),
        //     new window.qq.maps.LatLng(39.930, 116.420)
        // ];

        createInfo(map, lines[0], '<span style="font-size: 12px; margin-right: 10px;">起点</span>')
        createInfo(map, lines[lines.length - 1], '<span style="font-size: 12px; margin-right: 10px;">终点</span>')

        var polygon = new window.qq.maps.Polyline({
          map: map,
          path: lines,
          strokeColor: new window.qq.maps.Color(255, 105, 180, 0.8),
          strokeWeight: 5
        });

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
  }
  render() {
    return (
      <div className="Map">
        <BackBar title="路线规划" />
        <div id="mapContainer" className="mapContainer"></div>
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
        <footer className={this.state.showDetail ? 'routesPath fullHeight' : 'routesPath'}>
          <div className="moreLessBar" onClick={() => this.toggleRouteDetail()}><img className={this.state.showDetail ? 'less' : 'more'} src={`${process.env.PUBLIC_URL}/img/arrow.svg`} alt="" /></div>
          <ul className="flex-r flex-s-c route">
            {res.routes.map((route, index) => {
              return (
                <li key={index} className={route === currentRoute ? 'active' : ''}>
                  <h4>路线{index + 1}</h4>
                  <p>{route.duration}分钟</p>
                  <p>{route.distance}米</p>
                </li>
              )
            })}
          </ul>
          <ul className="steps">
            {currentRoute.steps.map((step, index) => {
              return (
                <li key={index}>
                  <span>●</span>
                  <h4>{step.road_name}</h4>
                  <p>{step.instruction}</p>
                </li>
              )
            })}
          </ul>
        </footer>
      </div>
    );
  }
}

// export default Routes;
export default connect(mapStateToProps)(Routes)


