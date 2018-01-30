import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Page/Home';
import Map from './Page/Map';
import Test from './Page/Test';

class Routers extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    console.log(this.props)
    return (
      <Router>
				<div className="container">
					<div className="page">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/map" component={Map}/>
              <Route exact path="/test" component={Test}/>
            </Switch>
					</div>
				</div>
			</Router>
    );
  }
}

export default Routers;
