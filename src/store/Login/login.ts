import { Module } from 'vuex'
import router from '@/router/index'
import { ILoginState } from './types'
import { IRootState } from '../types'
import { IAccount } from '@/service/login/types'
import { mapMenusToToutes, mapMenuToPermissions } from '@/hooks/index'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'

// Module<子store模块中的state类型，根store模块中的state类型>
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token
    },
    setUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    setUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 动态初始化菜单
      const routes = mapMenusToToutes(userMenus)
      routes.forEach(route => {
        router.addRoute('Main', route)
      })

      // 获取用户按钮权限
      const permissions = mapMenuToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    // 登录方法 - 账号的登录
    async acountLoginAction({ commit, dispatch }, payload: IAccount) {
      const { name, password, loading } = payload

      // 1. 获取登录状态
      const loginResult = await accountLoginRequest({ name, password })
      const { id, token } = loginResult.data
      commit('setToken', token)
      localCache.setCache('token', token)

      // 发送初始化请求（获取角色列表，和部门列表）
      dispatch('getInitiakDataAction', null, { root: true })

      // 2. 获取用户数据
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('setUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3. 请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id, loading)
      const userMenus = userMenusResult.data
      commit('setUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      router.push('/main')
    },
    // 登录方法 - 手机号验证码登录
    phoneLoginAction() {
      console.log('手机号登录 :>> ')
    },
    // 初始化基本数据
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('setToken', token)

        dispatch('getInitiakDataAction', null, { root: true })
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('setUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('setUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
