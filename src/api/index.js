import axios from 'axios'
import qs from 'qs'

// 创建 axios 实例
const instance = axios.create({
  baseURL: '/api/',
  timeout: 10000
})

const instanceSpecial = axios.create({
  baseURL: '/api/',
  timeout: 10000,
  headers: {'Content-Type': 'application/json; charset=utf-8'}
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
  // 可在发送请求前配置 token
    config.headers['Authorization'] = 'Bearer ' + JSON.parse(sessionStorage.getItem('book-shop-token'))
    return config
  }, function (error) {
    // 返回请求错误
    return error
  })

// 特殊请求拦截器
instanceSpecial.interceptors.request.use(
  config => {
    // 可在发送请求前配置 token
    config.headers['Authorization'] = 'Bearer ' + JSON.parse(sessionStorage.getItem('book-shop-token'))
    return config
  }, function (error) {
    // 返回请求错误
    return error
  })

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做些什么
  const res = response.data
  // token 存入 sessionStorage
  if (res.data.hasOwnProperty('token')) {
    sessionStorage.setItem('book-shop-token', JSON.stringify(res.data.token))
  }
  if (res.data.hasOwnProperty('user')) {
    sessionStorage.setItem('book-shop-user', JSON.stringify(res.data.user))
  }
  // 返回响应
  return res
}, function (error) {
  // 对响应数据错误做些什么
  return error.response.data
})

// 特殊响应拦截器
instanceSpecial.interceptors.response.use(function (response) {
  // 对响应数据做些什么
  const res = response.data
  // token 存入 sessionStorage
  if (res.data.hasOwnProperty('token')) {
    sessionStorage.setItem('book-shop-token', JSON.stringify(res.data.token))
  }
  if (res.data.hasOwnProperty('user')) {
    sessionStorage.setItem('book-shop-user', JSON.stringify(res.data.user))
  }
  // 返回响应
  return res
}, function (error) {
  // 对响应数据错误做些什么
  return error.response.data
})

// post请求
const post = function (url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, qs.stringify(params)).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// postSpecial请求
const postSpecial = function (url, params) {
  return new Promise((resolve, reject) => {
    instanceSpecial.post(url, params).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// get 请求
const get = function (url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, params).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// put 请求
const put = function (url, params) {
  return new Promise((resolve, reject) => {
    instance.put(url, qs.stringify(params)).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

// delete 请求
const del = function (url, params) {
  return new Promise((resolve, reject) => {
    instance.delete(url, params).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export default {post, get, put, del, postSpecial}
