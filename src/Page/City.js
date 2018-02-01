// import React, { Component } from 'react';
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import {
//   increment,
//   incrementAsync,
//   decrement,
//   decrementAsync
// } from '../reducers/counter'

// class Test extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {}
//     this.add = this.add.bind(this)
//     this.subtract = this.subtract.bind(this)
//   }
//   add () {
//     console.log('add')
//   }
//   subtract () {
//     console.log('subtract')
//   }
//   render() {
//     return (
//       <div className="Test">
//         Test
//         <div>
//           <button style={{'width': '40px'}} onClick={() => this.add()}> + </button>
//           <button style={{'width': '40px'}} onClick={() => this.subtract()}> - </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default Test;

import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  incrementAsync,
  decrement,
  decrementAsync
} from '../reducers/common'

import { increment } from '../actions/common'

const Test = props => (
  <div>
    <h1>Test</h1>
    <p>Count: {props.count}</p>
    <p>{props.location.city}</p>
    <p>
      <button onClick={props.increment} disabled={props.isIncrementing}>Increment</button>
      <button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
    </p>

    <p>
      <button onClick={props.decrement} disabled={props.isDecrementing}>Decrement</button>
      <button onClick={props.decrementAsync} disabled={props.isDecrementing}>Decrement Async</button>
    </p>

    <p><button onClick={() => props.changePage()}>Go to about page via redux</button></p>
  </div>
)

const mapStateToProps = state => ({
  location: state.common.location,
  count: state.common.count,
  isIncrementing: state.common.isIncrementing,
  isDecrementing: state.counter.isDecrementing
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)