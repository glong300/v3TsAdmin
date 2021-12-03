import { useStore } from '@/store'

export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()
  // 获取权限列表
  const permissions = store.state.login.permissions
  // 设置查找规则
  const verifyPermission = `system:${pageName}:${hanldeName}`

  return !!permissions.find(item => item.indexOf(verifyPermission))
}
