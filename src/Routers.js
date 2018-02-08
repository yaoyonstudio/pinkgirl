import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Page/Home';
import Map from './Page/Map';
import Street from './Page/Street';
import Routes from './Page/Routes';

import Weather from './Page/Tools/Weather';

import Test from './Page/Test';

class Routers extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Router>
				<div className="container">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/map" component={Map}/>
            <Route exact path="/street" component={Street}/>
            <Route exact path="/routes" component={Routes}/>
            <Route exact path="/tools/weather" component={Weather}/>
            <Route exact path="/test" component={Test}/>
          </Switch>
				</div>
			</Router>
    );
  }
}

export default Routers;
