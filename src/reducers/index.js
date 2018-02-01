import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import common from './common'

export default combineReducers({
  router: routerReducer,
  common,
  counter
})
