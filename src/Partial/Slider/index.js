import React, { Component } from 'react';
import './slider.css'

/* eslint-disable no-undef, no-unused-vars */

class Slider extends Component {
  componentDidMount () {
    var ele = this.refs.swiperContainer;
    var swiper = new Swiper(ele, {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      coverflowEffect: {
        rotate: 46,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      },
      onTransitionStart (swiper) {
        // console.log(swiper)
      }
    });
  }
  render() {
    return (
      <div className="sliderContainer" ref="swiperContainer">
        <div className="swiper-wrapper">
          {this.props.data && this.props.data.length
            ? this.props.data.map((item, index) => (
              <div className="swiper-slide" key={index}>
                <img src={item.src} alt="" />
              </div>
            ))
            : ''
          }
        </div>
      </div>
    );
  }
}

export default Slider
