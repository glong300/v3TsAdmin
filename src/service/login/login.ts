import { Ref } from 'vue'
// 登录请求
import request from '../index'

import { IAccount } from './types'

// 设置请求地址
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/' // 用法: role/1/menu
}

export const accountLoginRequest = (account: IAccount) => {
  return request.post({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export const requestUserInfoById = (id: number) => {
  return request.get({
    url: LoginAPI.LoginUserInfo + id
  })
}

export const requestUserMenusByRoleId = (id: number, loading?: Ref<boolean>) => {
  return request.get({
    url: LoginAPI.UserMenus + id + '/menu',
    interceptors: {
      responseInterceptor: config => {
        loading!.value = false
        return config
      },
      responseInterceptorCatch: err => {
        loading!.value = false
        return err
      }
    }
  })
}
