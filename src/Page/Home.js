import React, { Component } from 'react';
import SearchBar from '../Partial/SearchBar/index'
import Slider from '../Partial/Slider/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
  myLocation: state.common.myLocation
})

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slides: [
        {id: 1, src: process.env.PUBLIC_URL + '/img/slide1.jpg', url: 'http://www.baidu.com/'},
        {id: 2, src: process.env.PUBLIC_URL + '/img/slide2.jpg', url: 'http://www.baidu.com/'},
        {id: 3, src: process.env.PUBLIC_URL + '/img/slide3.jpg', url: 'http://www.baidu.com/'},
        {id: 4, src: process.env.PUBLIC_URL + '/img/slide4.jpg', url: 'http://www.baidu.com/'},
        {id: 5, src: process.env.PUBLIC_URL + '/img/slide5.jpg', url: 'http://www.baidu.com/'}
      ],
      featureds: [
        {id: 1, src: process.env.PUBLIC_URL + '/img/icon/i1.png', title: '地标找房', url: 'landmark'},
        {id: 2, src: process.env.PUBLIC_URL + '/img/icon/i2.png', title: '地图找房', url: 'map'},
        {id: 3, src: process.env.PUBLIC_URL + '/img/icon/i3.png', title: '帮你找房', url: 'test'},
        {id: 4, src: process.env.PUBLIC_URL + '/img/icon/i4.png', title: '查房价', url: 'test'},
        {id: 5, src: process.env.PUBLIC_URL + '/img/icon/i5.png', title: '别墅', url: 'test'},
        {id: 6, src: process.env.PUBLIC_URL + '/img/icon/i6.png', title: '住宅', url: 'test'},
        {id: 7, src: process.env.PUBLIC_URL + '/img/icon/i7.png', title: '商铺写字楼', url: '/tools/weather'}
      ],
      list: [
        {id: 1, img: process.env.PUBLIC_URL + '/img/houseItem1.jpg', title: '东城中天万科驿中天创客谷', zone: '中心城区-东城', areas: '197-277', price: '11000', styles: ['洋房', '公寓', '别墅', '商铺', '写字楼'], status: 3},
        {id: 2, img: process.env.PUBLIC_URL + '/img/houseItem2.jpg', title: '东城中天万科驿中天万科驿中天万科驿中天创客谷', zone: '中心城区-南城', areas: '97-141', price: '11088', styles: ['别墅', '商铺', '写字楼'], status: 1},
        {id: 3, img: process.env.PUBLIC_URL + '/img/houseItem1.jpg', title: '东城中天万科驿中天创客谷', zone: '中心城区-东城', areas: '117-260', price: '21099', styles: ['洋房', '公寓', '别墅'], status: 2},
        {id: 4, img: process.env.PUBLIC_URL + '/img/houseItem2.jpg', title: '东城中天万科驿中天创客谷', zone: '中心城区-东城', areas: '108-198', price: '8000', styles: ['洋房', '公寓', '别墅', '商铺', '写字楼'], status: 2}
      ]
    }
  }
  componentDidMount () {
    console.log(this.props)
  }
  render() {
    return (
      <div className="Home">
        <SearchBar />
        <Slider data={this.state.slides} />
        <section className="featured">
          <ul className="flex-r flex-s-s flex-wrap">
            {this.state.featureds && this.state.featureds.length
              ? this.state.featureds.map((item, index) => (
                <li key={index}>
                  <Link to={item.url}>
                    <img src={item.src} alt="" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))
              : ''
            }
          </ul>
        </section>
      </div>
    );
  }
}

// export default Home;
export default connect(mapStateToProps)(Home)
