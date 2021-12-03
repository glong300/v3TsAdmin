import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

interface IRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: AxiosError) => AxiosError
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: AxiosError) => AxiosError
}

interface IRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IRequestInterceptors<T> // 单独请求拦截
  showLoading?: boolean // 全局加载动画
}

export { IRequestInterceptors, IRequestConfig }
