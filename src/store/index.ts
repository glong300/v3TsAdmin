import { createStore, Store, useStore as userVuexStore } from 'vuex'
import login from './Login/login'
import system from './Main/System/system'
import dashboard from './Main/Analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

import {
  EntireDepartmentType,
  EntireRoleType,
  EntireMenuType,
  IRootState,
  IStoreType
} from './types'

const store = createStore<IRootState>({
  state: () => {
    return {
      entireDepartment: [], // 全部部门
      entireRole: [], // 全部角色
      entireMenu: []
    }
  },
  mutations: {
    setEntireDepartment(state, list: EntireDepartmentType[]) {
      state.entireDepartment = list
    },
    setEntireRole(state, list: EntireRoleType[]) {
      state.entireRole = list
    },
    setEntireMenu(state, list: EntireMenuType[]) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    async getInitiakDataAction({ commit }) {
      // 请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: department } = departmentResult.data

      const RoletResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: role } = RoletResult.data

      const menuResult = await getPageListData('/menu/list', {})
      const { list: menu } = menuResult.data

      commit('setEntireDepartment', department)
      commit('setEntireRole', role)
      commit('setEntireMenu', menu)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return userVuexStore()
}

export default store
