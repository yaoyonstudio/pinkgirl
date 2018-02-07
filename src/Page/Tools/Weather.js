import React, { Component } from 'react'
import { getCurLocation } from '../../libs/qqMap'

import { toolServices } from '../../Services'

import BackBar from '../../Partial/BackBar'
import WeatherItem from '../../Partial/Tools/WeatherItem'

const WeatherCode = [
  {"id": 100, "codeStr_CN": "晴", "codeStr_EN": "Sunny/Clear", "img": "https://cdn.heweather.com/cond_icon/100.png"},
  {"id": 101, "codeStr_CN": "多云", "codeStr_EN": "Cloudy", "img": "https://cdn.heweather.com/cond_icon/101.png"},
  {"id": 102, "codeStr_CN": "少云", "codeStr_EN": "Few Clouds", "img": "https://cdn.heweather.com/cond_icon/102.png"},
  {"id": 103, "codeStr_CN": "晴间多云", "codeStr_EN": "Partly Cloudy", "img": "https://cdn.heweather.com/cond_icon/103.png"},
  {"id": 104, "codeStr_CN": "阴", "codeStr_EN": "Overcast", "img": "https://cdn.heweather.com/cond_icon/104.png"},
  {"id": 200, "codeStr_CN": "有风", "codeStr_EN": "Windy", "img": "https://cdn.heweather.com/cond_icon/200.png"},
  {"id": 201, "codeStr_CN": "平静", "codeStr_EN": "Calm", "img": "https://cdn.heweather.com/cond_icon/201.png"},
  {"id": 202, "codeStr_CN": "微风", "codeStr_EN": "Light Breeze", "img": "https://cdn.heweather.com/cond_icon/202.png"},
  {"id": 203, "codeStr_CN": "和风", "codeStr_EN": "Moderate", "img": "https://cdn.heweather.com/cond_icon/203.png"},
  {"id": 204, "codeStr_CN": "清风", "codeStr_EN": "Fresh Breeze", "img": "https://cdn.heweather.com/cond_icon/204.png"},
  {"id": 205, "codeStr_CN": "强风", "codeStr_EN": "Strong Breeze", "img": "https://cdn.heweather.com/cond_icon/205.png"},
  {"id": 206, "codeStr_CN": "疾风", "codeStr_EN": "High Wind", "img": "https://cdn.heweather.com/cond_icon/206.png"},
  {"id": 207, "codeStr_CN": "大风", "codeStr_EN": "Gale", "img": "https://cdn.heweather.com/cond_icon/207.png"},
  {"id": 208, "codeStr_CN": "烈风", "codeStr_EN": "Strong Gale", "img": "https://cdn.heweather.com/cond_icon/208.png"},
  {"id": 209, "codeStr_CN": "风暴", "codeStr_EN": "Storm", "img": "https://cdn.heweather.com/cond_icon/209.png"},
  {"id": 210, "codeStr_CN": "狂爆风", "codeStr_EN": "Violent", "img": "https://cdn.heweather.com/cond_icon/210.png"},
  {"id": 211, "codeStr_CN": "飓风", "codeStr_EN": "Hurricane", "img": "https://cdn.heweather.com/cond_icon/211.png"},
  {"id": 212, "codeStr_CN": "龙卷风", "codeStr_EN": "Tornado", "img": "https://cdn.heweather.com/cond_icon/212.png"},
  {"id": 213, "codeStr_CN": "热带风暴", "codeStr_EN": "Tropical Storm", "img": "https://cdn.heweather.com/cond_icon/213.png"},
  {"id": 300, "codeStr_CN": "阵雨", "codeStr_EN": "Shower Rain", "img": "https://cdn.heweather.com/cond_icon/300.png"},
  {"id": 301, "codeStr_CN": "强阵雨", "codeStr_EN": "Heavy Shower Rain", "img": "https://cdn.heweather.com/cond_icon/301.png"},
  {"id": 302, "codeStr_CN": "雷阵雨", "codeStr_EN": "Thundershower", "img": "https://cdn.heweather.com/cond_icon/302.png"},
  {"id": 303, "codeStr_CN": "强雷阵雨", "codeStr_EN": "Heavy Thunderstorm", "img": "https://cdn.heweather.com/cond_icon/303.png"},
  {"id": 304, "codeStr_CN": "雷阵雨伴有冰雹", "codeStr_EN": "Hail", "img": "https://cdn.heweather.com/cond_icon/304.png"},
  {"id": 305, "codeStr_CN": "小雨", "codeStr_EN": "Light Rain", "img": "https://cdn.heweather.com/cond_icon/305.png"},
  {"id": 306, "codeStr_CN": "中雨", "codeStr_EN": "Moderate Rain", "img": "https://cdn.heweather.com/cond_icon/306.png"},
  {"id": 307, "codeStr_CN": "大雨", "codeStr_EN": "Heavy Rain", "img": "https://cdn.heweather.com/cond_icon/307.png"},
  {"id": 308, "codeStr_CN": "极端降雨", "codeStr_EN": "Extreme Rain", "img": "https://cdn.heweather.com/cond_icon/308.png"},
  {"id": 309, "codeStr_CN": "细雨", "codeStr_EN": "Drizzle Rain", "img": "https://cdn.heweather.com/cond_icon/309.png"},
  {"id": 310, "codeStr_CN": "暴雨", "codeStr_EN": "Storm", "img": "https://cdn.heweather.com/cond_icon/310.png"},
  {"id": 311, "codeStr_CN": "大暴雨", "codeStr_EN": "Heavy Storm", "img": "https://cdn.heweather.com/cond_icon/311.png"},
  {"id": 312, "codeStr_CN": "特大暴雨", "codeStr_EN": "Severe Storm", "img": "https://cdn.heweather.com/cond_icon/312.png"},
  {"id": 313, "codeStr_CN": "冻雨", "codeStr_EN": "Freezing Rain", "img": "https://cdn.heweather.com/cond_icon/313.png"},
  {"id": 400, "codeStr_CN": "小雪", "codeStr_EN": "Light Snow", "img": "https://cdn.heweather.com/cond_icon/400.png"},
  {"id": 401, "codeStr_CN": "中雪", "codeStr_EN": "Moderate Snow", "img": "https://cdn.heweather.com/cond_icon/401.png"},
  {"id": 402, "codeStr_CN": "大雪", "codeStr_EN": "Heavy Snow", "img": "https://cdn.heweather.com/cond_icon/402.png"},
  {"id": 403, "codeStr_CN": "暴雪", "codeStr_EN": "Snowstorm", "img": "https://cdn.heweather.com/cond_icon/403.png"},
  {"id": 404, "codeStr_CN": "雨夹雪", "codeStr_EN": "Sleet", "img": "https://cdn.heweather.com/cond_icon/404.png"},
  {"id": 405, "codeStr_CN": "雨雪天气", "codeStr_EN": "Rain And Snow", "img": "https://cdn.heweather.com/cond_icon/405.png"},
  {"id": 406, "codeStr_CN": "阵雨夹雪", "codeStr_EN": "Shower Snow", "img": "https://cdn.heweather.com/cond_icon/406.png"},
  {"id": 407, "codeStr_CN": "阵雪", "codeStr_EN": "Snow Flurry", "img": "https://cdn.heweather.com/cond_icon/407.png"},
  {"id": 500, "codeStr_CN": "薄雾", "codeStr_EN": "Mist", "img": "https://cdn.heweather.com/cond_icon/500.png"},
  {"id": 501, "codeStr_CN": "雾", "codeStr_EN": "Foggy", "img": "https://cdn.heweather.com/cond_icon/501.png"},
  {"id": 502, "codeStr_CN": "霾", "codeStr_EN": "Haze", "img": "https://cdn.heweather.com/cond_icon/502.png"},
  {"id": 503, "codeStr_CN": "扬沙", "codeStr_EN": "Sand", "img": "https://cdn.heweather.com/cond_icon/503.png"},
  {"id": 504, "codeStr_CN": "浮尘", "codeStr_EN": "Dust", "img": "https://cdn.heweather.com/cond_icon/504.png"},
  {"id": 507, "codeStr_CN": "沙尘暴", "codeStr_EN": "Duststorm", "img": "https://cdn.heweather.com/cond_icon/507.png"},
  {"id": 508, "codeStr_CN": "强沙尘暴", "codeStr_EN": "Sandstorm", "img": "https://cdn.heweather.com/cond_icon/508.png"},
  {"id": 900, "codeStr_CN": "热", "codeStr_EN": "Hot", "img": "https://cdn.heweather.com/cond_icon/900.png"},
  {"id": 901, "codeStr_CN": "冷", "codeStr_EN": "Cold", "img": "https://cdn.heweather.com/cond_icon/901.png"},
  {"id": 999, "codeStr_CN": "未知", "codeStr_EN": "Unknown", "img": "https://cdn.heweather.com/cond_icon/999.png"}
]

class Weather extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {},
      data: {},
      daily_forecast: []
    }
  }
  componentDidMount () {
    getCurLocation((res) => {
      console.log(res)
      this.setState({
        location: res
      })
      this.getWeather(res.city, (response) => {
        console.log(response)
        if (response.HeWeather6[0] && response.HeWeather6[0].status === 'ok') {
          this.setState({
            ...this.state,
            data: response.HeWeather6[0].daily_forecast[0],
            daily_forecast: response.HeWeather6[0].daily_forecast
          })
        }
      }, (err) => {
        console.log(err)
      })
    }, (err) => {
      console.log(err)
      alert('无法定位')
    })
  }
  getWeather (param, fn, errFn) {
    if (!param || !fn) return
    toolServices.getWeather({
      location: param
    }, (res) => {
      fn(res)
    })
  }
  render () {
    // const data = {
    //   "cond_code_d": "305",
    //   "cond_code_n": "104",
    //   "cond_txt_d": "小雨",
    //   "cond_txt_n": "阴",
    //   "date": "2018-01-19",
    //   "hum": "71",
    //   "mr": "08:09",
    //   "ms": "19:16",
    //   "pcpn": "1.2",
    //   "pop": "83",
    //   "pres": "1025",
    //   "sr": "06:52",
    //   "ss": "17:17",
    //   "tmp_max": "10",
    //   "tmp_min": "7",
    //   "uv_index": "2",
    //   "vis": "19",
    //   "wind_deg": "57",
    //   "wind_dir": "东北风",
    //   "wind_sc": "微风",
    //   "wind_spd": "3"
    // }

    return (
      <div className="flex-c flex-c-b Weather">
        <BackBar title="天气查询" />

        <header className="Weather_header">
          <h3>{this.state.location.city} {this.state.location.district}</h3>
          <p>{this.state.data.date}</p>
        </header>

        <section className="flex-r flex-c-b Weather_main">
          <img src={process.env.PUBLIC_URL + '/img/icon/' + this.state.data.cond_code_d + '.png' } alt="天气状况" />
          <aside>
            <p>{this.state.data.tmp_min} - {this.state.data.tmp_max} &#8451;</p>
          </aside>
        </section>

        <section className="Weather_info">
          <ul className="flex-r flex-b flex-wrap detail">
            <li className="flex-c flex-c-c">
              <p><span>白天: </span>{this.state.data.cond_txt_d}</p>
              <p><span>夜晚: </span>{this.state.data.cond_txt_n}</p>
            </li>
            <li className="flex-c flex-c-c">
              <p><span></span>{this.state.data.wind_dir}</p>
              <p><span></span>{this.state.data.wind_sc}</p>
              <p></p>
            </li>
            <li className="flex-c flex-c-c">
              <p><span>相对湿度</span></p>
              <p>{this.state.data.hum}</p>
            </li>
            <li className="flex-c flex-c-c">
              <p><span>降水量</span></p>
              <p>{this.state.data.pcpn}</p>
            </li>
          </ul>
          <footer className="forecast">
            {this.state.daily_forecast.length && 
              <ul className="flex-r flex-c-b">
                {this.state.daily_forecast.map((item, index) => {
                  return (
                    <li className="flex-c flex-c-c" key={index}>
                      <p>{item.date}</p>
                      <img src={process.env.PUBLIC_URL + '/img/icon/' + item.cond_code_d + '.png' } alt="天气状况" />
                      <h4>{item.cond_txt_d}</h4>
                    </li>
                  )
                })}
              </ul>
            }
          </footer>
        </section>
        
        

      </div>
    );
  }
}

export default Weather;
