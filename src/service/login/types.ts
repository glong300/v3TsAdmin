import { IIsLoadingName } from '../types'

export interface IAccount extends IIsLoadingName<boolean> {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}
