import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'

import { getCurLocation } from './libs/qqMap/index'

const common = {}

getCurLocation((data) => {
  console.log('定位成功：', data)
  common.location = data
}, (error) => {
  console.log('定位失败：', error)
})

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        ddd
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'));
  
registerServiceWorker();
