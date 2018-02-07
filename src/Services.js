import { Ajax } from './libs/keact'

let getParamsHelper = function (params) {
  if (params && typeof params === 'object' && params.constructor === Object) {
      var tmp = []
      for (let i in params) {
          tmp.push(i + '=' + params[i])
      }
      return tmp.join('&')
  } else {
      return ''
  }
}

const apiUrl = 'https://ljbyadmin.ling5000.com/api'
const HEAPIKEY = '9b7070b8f66a4f138da02acd96736f35'

export const publicService = {
  versionInfo (params, fn) {
    Ajax.call(this, apiUrl + '/Common/versionInfo', 'post', params, fn)
  }
}

export const toolServices = {
  getWeather (params, fn) {
    Ajax.call(this, `https://free-api.heweather.com/s6/weather/forecast?key=${HEAPIKEY}&${getParamsHelper(params)}`, 'GET', null, fn)
  }
}