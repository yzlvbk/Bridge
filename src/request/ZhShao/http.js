/* 封装axios请求函数模块 */
import axios from 'axios'
import { Message } from 'element-ui'

// 开发环境
const baseUrl = 'http://118.190.216.205:8005/bridgeWeb'
// 生产环境
// const baseUrl = ''

// 请求拦截
axios.interceptors.request.use(config => {
  // 在最后必须 return config
  return config
})

export default function http (url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise

    // 1.执行异步ajax请求
    if (type === 'GET') {
      promise = axios.get((baseUrl + url), {
        params: data // 指定请求参数
      })
    }

    if (type === 'POST') {
      promise = axios.post((baseUrl + url), data)
    }

    promise.then(response => {
      // 2.如果成功了，调用resolve
      resolve(response.data)
    }).catch(() => {
      // 3.如果失败了，不调用reject，而是显示异常信息
      Message.error('请求数据失败!')
      return false
    })
  })
}
