import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

interface IRequestInterceptors<T = AxiosResponse> {
  // 请求拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: AxiosError) => AxiosError

  // 响应拦截
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: AxiosError) => AxiosError
}

interface IRequestConfig<T = AxiosResponse, D = any> extends AxiosRequestConfig<D> {
  interceptors?: IRequestInterceptors<T> // 单独请求拦截
  showLoading?: boolean // 全局加载动画
}

export { IRequestInterceptors, IRequestConfig }
