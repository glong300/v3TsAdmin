import { Module } from 'vuex'

import { IRootState } from '../../types'
import { IDashboardState } from './types'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    setCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    setCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    setCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    setAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      commit('setCategoryGoodsCount', categoryCountResult.data)

      const categorySaleResult = await getCategoryGoodsSale()
      commit('setCategoryGoodsSale', categorySaleResult.data)

      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('setCategoryGoodsFavor', categoryFavorResult.data)

      const addressGoodsResult = await getAddressGoodsSale()
      commit('setAddressGoodsSale', addressGoodsResult.data)
    }
  }
}

export default dashboardModule
