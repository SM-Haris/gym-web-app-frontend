import axios from 'axios'
import { setToken, toLoginPage } from './sso'
import { message } from 'antd'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return {
      Authorization: 'Bearer ' + token,
    }
  } else {
    return {}
  }
}

const ssoService = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
  timeout: 20 * 1000,
})

const portalService = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/api',
  timeout: 20 * 1000,
})

ssoService.interceptors.response.use(
  (response: any) => {
    const { status } = response
    switch (status) {
      case 200:
      case 201:
        setToken(response.data.data.access_token)
        return response.data
      case 401:
        toLoginPage(true)
        return response.data
      default:
        message.error('Network Error')
        return Promise.reject(new Error('Network Error'))
    }
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

portalService.interceptors.request.use(
  (config: any) => {
    config.headers = getAuthHeader()
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

portalService.interceptors.response.use(
  (response: any) => {
    const { status } = response
    switch (status) {
      case 200:
      case 201:
      case 204:
        return response.data
      case 401:
        toLoginPage(true)
        return response.data
      default:
        message.error('Network Error')
        return Promise.reject(new Error('Network Error'))
    }
  },
  (error: any) => {
    if (error?.response?.status === 401) {
      toLoginPage(true)
    }
    return Promise.reject(error)
  }
)

export { portalService, ssoService }
