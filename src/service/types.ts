import { Ref } from 'vue'
import { AxiosError } from 'axios'

interface IDataType<T = any> {
  code: number
  data: T
}

// 加载动画
interface IIsLoadingName<T = any> {
  loading?: Ref<T>
}

// 请求失败的拦截码
const httpErrorStatusHandle = (error: AxiosError) => {
  const status = error.response?.status

  switch (status) {
    case 400:
      error.message = '请求错误(400)'
      break
    case 401:
      error.message = '未授权,请登录(401)'
      break
    case 403:
      error.message = '拒绝访问(403)'
      break
    case 404:
      error.message = `请求地址出错: ${error.response?.config.url}`
      break
    case 405:
      error.message = '请求方法未允许(405)'
      break
    case 408:
      error.message = '请求超时(408)'
      break
    case 500:
      error.message = '服务器内部错误(500)'
      break
    case 501:
      error.message = '服务未实现(501)'
      break
    case 502:
      error.message = '网络错误(502)'
      break
    case 503:
      error.message = '服务不可用(503)'
      break
    case 504:
      error.message = '网络超时(504)'
      break
    case 505:
      error.message = 'HTTP版本不受支持(505)'
      break
    default:
      error.message = `连接错误，${error.message}`
  }

  if (!error || !error.response) {
    if (error.message == 'Network Error') error.message = '网络异常，请检查后重试'
    else error.message = '连接服务器失败，请联系管理员'
  }

  return error
}

// 请求成功的拦截码
const httpSuccessStatusHandle = (data: IDataType) => {
  const status = data.code

  switch (status) {
    case 0:
    case 1:
      return 'success'

    default:
      return 'success'
  }
}

export { IDataType, IIsLoadingName, httpErrorStatusHandle, httpSuccessStatusHandle }
