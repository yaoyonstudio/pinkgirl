import { GET_LOCATION, INCREMENT_REQUESTED, INCREMENT } from './actionTypes'
import { getCurLocation } from '../libs/qqMap/index'

export const getLocation = () => {
  return dispatch => {
    getCurLocation((data) => {
      console.log('定位成功：', data)
      dispatch({
        type: GET_LOCATION,
        payload: data
      })
    }, (error) => {
      console.log('定位失败：', error)
    })
  }
}

export const increment = () => {
  return dispatch => {
    dispatch({
      type: INCREMENT_REQUESTED
    })

    dispatch({
      type: INCREMENT
    })
  }
}
