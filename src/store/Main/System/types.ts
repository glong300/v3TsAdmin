import { Ref } from 'vue'

export interface ITableDataListType {
  id: number
  name?: string
  createAt: string
  updateAt: string
}

export interface ISystemType {
  usersList: ITableDataListType[]
  usersCount: number
  roleList: ITableDataListType[]
  roleCount: number
  goodsList: ITableDataListType[]
  goodsCount: number
  menuList: ITableDataListType[]
  menuCount: number
}

export interface IActionType {
  id?: number
  queryInfo?: any
  pageName: string
  pageData?: any
  loading?: Ref<boolean>[]
}
