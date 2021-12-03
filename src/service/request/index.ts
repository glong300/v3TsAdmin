import axios from 'axios'
import { AxiosInstance, AxiosResponse } from 'axios'

// 扩展参数
import { IRequestConfig, IRequestInterceptors } from './types'
// 约束返回值类型
import { IDataType, httpSuccessStatusHandle, httpErrorStatusHandle } from '../types'

import { ElLoading, ILoadingInstance, ElMessage, Message } from 'element-plus'

import localCache from '@/utils/cache'

const DEAFULT_LOADING = false

class request {
  private instance: AxiosInstance // 初始化axios
  private interceptors?: IRequestInterceptors // 实例化单独拦截器
  private showLoading: boolean // 加载动画状态
  private loading?: ILoadingInstance // 加载动画函数
  private message?: Message // 提示框

  constructor(config: IRequestConfig) {
    this.instance = axios.create(config) // 初始化axios

    this.interceptors = config.interceptors // 初始化单独拦截器
    this.showLoading = config.showLoading ?? DEAFULT_LOADING // 是否有加载动画
    this.message = ElMessage // 初始化提示

    // 全局请求拦截
    this.instance.interceptors.request.use(
      config => {
        // 携带token的拦截
        const token = localCache.getCache('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
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

    // 全局响应拦截
    this.instance.interceptors.response.use(
      config => {
        const msg = httpSuccessStatusHandle(config.data)

        // 移除loading动画
        this.loading?.close()

        if (msg !== 'success') {
          return Promise.reject(msg)
        }

        return config
      },
      err => {
        // 移除loading动画
        this.loading?.close()

        // 拦截错误代码
        const message = httpErrorStatusHandle(err)

        return Promise.reject(message)
      }
    )
  }

  request<T extends AxiosResponse<IDataType>>(config: IRequestConfig<T>): Promise<IDataType> {
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
        .request<any, T>(config)
        .then(res => {
          // 请求的单独响应拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          this.showLoading = DEAFULT_LOADING

          reslove(res.data)
        })
        .catch(err => {
          // 请求的单独响应拦截器
          if (config.interceptors?.responseInterceptorCatch) {
            err = config.interceptors.responseInterceptorCatch(err)
          }

          this.showLoading = DEAFULT_LOADING

          this.message?.error({
            message: err,
            duration: 2000
          })

          reject(err)
        })
    })
  }

  get<T extends AxiosResponse<IDataType>>(config: IRequestConfig<T>): Promise<IDataType> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T extends AxiosResponse<IDataType>>(config: IRequestConfig<T>): Promise<IDataType> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T extends AxiosResponse<IDataType>>(config: IRequestConfig<T>): Promise<IDataType> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T extends AxiosResponse<IDataType>>(config: IRequestConfig<T>): Promise<IDataType> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default request
