import axios from 'axios'
import Vue from 'vue'
import router from '../router/index'
import qs from 'qs'

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 可在发送请求前配置 token
  config.headers['Authorization'] = JSON.parse(sessionStorage.getItem('token'))
  return config
}, function (error) {
  // 返回请求错误
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做些什么
  const res = response.data
  console.log(res)
  // token 存入 sessionStorage
  if (res.hasOwnProperty('token')) {
    sessionStorage.setItem('token', JSON.stringify({data: res.data.token}))
  }
  if (!res.message === 'OK') {
    Vue.prototype.$message({
      message: res.detail,
      type: 'warning'
    })
    router.push({name: 'AdminLogin'})
  } else {
    // token 没问题,返回响应
    return res
  }
}, function (error) {
  // 对响应数据错误做些什么
  return error
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

export default {post, get, put, del}
