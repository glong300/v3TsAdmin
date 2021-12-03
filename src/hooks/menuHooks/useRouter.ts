import { IBreadcrumb } from '@/base-ui/Breadcrumb'
import { RouteRecordRaw } from 'vue-router'

import { IMenuType } from './types'

let firstMenu: any

/**
 * @description
 * @author long
 * @date 2021-11-12 04:11:52
 * @param {any[]} userMenus
 * @returns {Router} {Router}
 */
export function mapMenusToToutes(userMenus: IMenuType[]): RouteRecordRaw[] {
  // 加载默认所有的routes
  const routes: RouteRecordRaw[] = []

  const allRoutes: RouteRecordRaw[] = []
  // 获取改文件夹下所有ts文件
  const routerFiles = require.context('../../router/Main', true, /\.ts/)
  // 遍历获取到的结果
  routerFiles.keys().forEach(key => {
    // key 文件路径
    const store = require('../../router/Main' + key.split('.')[1])

    allRoutes.push(store.default)
  })

  // 递归查找所有符合标准的路由
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find(route => route.path === menu.url)
        if (route) routes.push(route)

        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

/**
 * @description 获取面包屑数据
 * @author long
 * @date 2021-11-13 10:11:47
 * @param {any[]} userMenu
 * @param {string} currentPath
 */
export function pathMapBreadcrumbs(userMenu: IMenuType[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenu, currentPath, breadcrumbs)

  return breadcrumbs
}

/**
 * @description 获取当前子菜单
 * @author long
 * @date 2021-11-12 04:11:38
 * @param {any[]} userMenu
 * @param {string} currentPath
 * @param {IBreadcrumb[]} breadcrumbs
 * @returns {*}  {*}
 */
export function pathMapToMenu(
  userMenu: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenu) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)

      if (findMenu) {
        breadcrumbs?.push({ name: menu.name, path: menu.url })
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function mapMenuToPermissions(userMenu: IMenuType[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: IMenuType[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }

  _recurseGetPermission(userMenu)

  return permissions
}

// 获取树结构的id
export function menuMapLeafKeys(menuList: IMenuType[]) {
  const leftKeys: number[] = []

  const _recurseGetLeaf = (menuList: IMenuType[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }

  _recurseGetLeaf(menuList)

  return leftKeys
}

export { firstMenu }
