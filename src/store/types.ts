import { ILoginState } from './Login/types'
import { ISystemType } from './Main/System/types'
import { IDashboardState } from './Main/Analysis/types'

// 部门列表接口
export interface EntireDepartmentType {
  id: number
  name: string
  leader: string
  parentId: number
  createAt: string
  updateAt: string
}
// 角色列表接口
export interface EntireRoleType {
  id: number
  name: string
  intro: string
  menuList: any[]
  createAt: string
  updateAt: string
}

// 权限列表接口
export interface EntireMenuType {
  id: number
  name: string
  children: any[]
  createAt: string
  updateAt: string
}
export interface IRootState {
  entireDepartment: EntireDepartmentType[]
  entireRole: EntireRoleType[]
  entireMenu: EntireMenuType[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemType
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
