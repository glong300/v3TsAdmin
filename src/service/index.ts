import Request from './request'

const request = new Request({
  baseURL: '/api/',
  timeout: 10000
})

export default request
