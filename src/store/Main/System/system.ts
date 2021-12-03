import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { ISystemType, IActionType } from './types'

import {
  getPageListData,
  deletePagedata,
  createPageData,
  editPageData
} from '@/service/main/system/system'
import { ITableDataListType } from './types'

const SystemModule: Module<ISystemType, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  // 存储数据
  mutations: {
    setUsersList(state, list: ITableDataListType[]) {
      state.usersList = list
    },
    setUsersCount(state, count: number) {
      state.usersCount = count
    },
    setRoleList(state, list: ITableDataListType[]) {
      state.roleList = list
    },
    setRoleCount(state, count: number) {
      state.roleCount = count
    },
    setGoodsList(state, list: ITableDataListType[]) {
      state.goodsList = list
    },
    setGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    setMenuList(state, list: ITableDataListType[]) {
      state.menuList = list
    },
    setMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    // 获取table列表数据
    async getPageListAction({ commit }, payload: IActionType) {
      // 1. 获取页面url
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      // 获取数据
      const pageResult = await getPageListData(pageUrl, payload.queryInfo, payload.loading)
      const { list, totalCount } = pageResult.data

      // 首字母转大写
      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      // 存入数据
      commit(`set${changePageName}List`, list)
      commit(`set${changePageName}Count`, totalCount)
    },
    // 删除操作
    async deletePageDataAction({ dispatch }, payload: IActionType) {
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/${payload.id}`

      await deletePagedata(pageUrl)

      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 新建操作
    async createPageDataAction({ dispatch }, payload: IActionType) {
      // 获取创建url
      const { pageName, pageData } = payload
      const pageUrl = `/${pageName}`

      // 请求创建接口
      await createPageData(pageUrl, pageData)

      // 更新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 编辑
    async editPageDataAction({ dispatch }, payload: IActionType) {
      // 获取创建url
      const { pageName, pageData, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 请求编辑接口
      await editPageData(pageUrl, pageData)

      // 更新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default SystemModule
