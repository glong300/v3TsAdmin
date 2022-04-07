import axios from 'axios'
import { AxiosInstance } from 'axios'

// 扩展参数
import { IRequestConfig, IRequestInterceptors } from './types'
// 约束返回值类型
import { IDataType, httpSuccessStatusHandle, httpErrorStatusHandle } from '../types'

import { ElLoading, ILoadingInstance, ElMessage, Message } from 'element-plus'

import localCache from '@/utils/cache'

const enum DEAFULT_CONSTANT {
  DEAFULT_LOADING = 0,
  DEAFULT_CANCEL_REQUEST = 1
}

class request {
  private instance: AxiosInstance // 初始化axios
  private interceptors?: IRequestInterceptors // 实例化单独拦截器
  private cancelRequestMap?: Map<string, () => void>
  private showLoading: boolean // 加载动画状态
  private loading?: ILoadingInstance // 加载动画函数
  private message?: Message // 提示框
  private repeatRequestCancel?: boolean = true

  constructor(config: IRequestConfig) {
    this.instance = axios.create(config) // 初始化axios
    this.interceptors = config.interceptors // 初始化单独拦截器
    this.cancelRequestMap = new Map()

    this.showLoading = config.showLoading ?? Boolean(DEAFULT_CONSTANT.DEAFULT_LOADING) // 是否有加载动画
    this.message = ElMessage // 初始化提示
    this.repeatRequestCancel =
      config.repeatRequestCancel ?? Boolean(DEAFULT_CONSTANT.DEAFULT_CANCEL_REQUEST)

    // 全局请求拦截
    this.instance.interceptors.request.use(
      config => {
        // 拦截重复请求
        if (this.repeatRequestCancel) {
          this.cancelRequest(config.url as string)
          this.addCancelRequest(config)
        }

        // 携带token的拦截
        const token = localCache.getCache('token')

        if (token) {
          config.headers!.Authorization = `Bearer ${token}`
        }

        // 开启加载动画
        if (this.showLoading) {
          // 初始化加载动画
          this.loading = ElLoading.service()
        }

        return config
      },
      err => {
        return err
      }
    )

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    // 实例请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 实例请求拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 全局响应拦截
    this.instance.interceptors.response.use(
      config => {
        const msg = httpSuccessStatusHandle(config.data)

        // 移除loading动画
        this.loading?.close()

        if (msg !== 'success') {
          return Promise.reject(msg)
        }

        return config.data
      },
      err => {
        console.log('err :>> ', err)
        // 移除loading动画
        this.loading?.close()

        // 拦截错误代码
        const message = httpErrorStatusHandle(err)

        return Promise.reject(message)
      }
    )
  }

  /**
   * 添加请求，用url作为请求唯一值
   * @param {IRequestConfig} config
   */
  private addCancelRequest(config: IRequestConfig) {
    const url = config.url
    if (url) {
      config.cancelToken = new axios.CancelToken(c => {
        this.cancelRequestMap?.set(url, c)
      })
    }
  }

  /**
   * 删除重复的请求
   * @param {string} url
   */
  private cancelRequest(url: string) {
    if (this.cancelRequestMap?.has(url)) {
      this.cancelRequestMap.get(url)!()
      this.cancelRequestMap.delete(url)
    }
  }

  request<T = IDataType, D = any>(config: IRequestConfig<T, D>): Promise<T> {
    return new Promise((reslove, reject) => {
      // 请求的单独请求拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 判断是否开启全局loading动画
      if (config.showLoading) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T, D>(config)
        .then(res => {
          // 请求的单独响应拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          this.showLoading = Boolean(DEAFULT_CONSTANT.DEAFULT_LOADING)

          reslove(res)
        })
        .catch(err => {
          // 请求的单独响应拦截器
          if (config.interceptors?.responseInterceptorCatch) {
            err = config.interceptors.responseInterceptorCatch(err)
          }

          this.showLoading = Boolean(DEAFULT_CONSTANT.DEAFULT_LOADING)

          this.message?.error({
            message: err,
            duration: 2000
          })

          reject(err)
        })
    })
  }

  get<T = IDataType, D = any>(config: IRequestConfig<T, D>): Promise<T> {
    return this.request<T, D>({ ...config, method: 'GET' })
  }

  post<T = IDataType, D = any>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T, D>({ ...config, method: 'POST' })
  }

  delete<T = IDataType, D = any>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T, D>({ ...config, method: 'DELETE' })
  }

  patch<T = IDataType, D = any>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T, D>({ ...config, method: 'PATCH' })
  }
}

export default request
