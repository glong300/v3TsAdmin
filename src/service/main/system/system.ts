import { Ref } from 'vue'
import request from '../../index'

// 获取table数据
export function getPageListData(url: string, queryInfo: any, loading?: Ref<boolean>[]) {
  return request.post({
    url,
    data: queryInfo,
    interceptors: {
      responseInterceptor: config => {
        for (const item of loading ?? []) {
          item.value = false
        }
        return config
      },
      responseInterceptorCatch: err => {
        for (const item of loading ?? []) {
          item.value = false
        }
        return err
      }
    }
  })
}

export function deletePagedata(url: string) {
  return request.delete({
    url
  })
}

// 新建操作
export function createPageData(url: string, newData: any) {
  return request.post({ url, data: newData })
}

// 编辑操作
export function editPageData(url: string, editData: any) {
  return request.patch({ url, data: editData })
}
