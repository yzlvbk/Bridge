/* 封装axios请求函数模块 */
import axios from 'axios'
import { Message } from 'element-ui'

// 导入Nprogress包对应的js和css
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 请求拦截
axios.interceptors.request.use(config => {
  // 在request中显示进度条
  Nprogress.start()
  // 在最后必须 return config
  return config
})

// 在response中隐藏进度条
axios.interceptors.response.use(config => {
  Nprogress.done()
  // 在最后必须 return config
  return config
})

export default function http (url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise

    // 1.执行异步ajax请求
    if (type === 'GET') {
      promise = axios.get(url, {
        params: data // 指定请求参数
      })
    }

    if (type === 'POST') {
      promise = axios.post(url, data)
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
