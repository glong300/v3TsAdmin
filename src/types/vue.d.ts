/* eslint-disable */
import { Ref } from 'vue'
import type { Store } from 'vuex'
import { IStoreType } from '@/store/types'
import request from '@/service'

declare module '@vue/runtime-core' {
  interface filtersType {
    formatTime: (date: string | number) => string
  }
  interface ComponentCustomProperties {
    // 请求全局请求
    $http: typeof request
    $filters: filtersType
    $store: Store<IStoreType>
  }
}
