import { ref } from 'vue'

import { IPageModalType } from '@/components/PageModal'

type CallbackFn = (...other: any) => void

export default function (newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<IPageModalType>()
  const defaultInfo = ref({})

  // 新增用户
  const handleNewData = () => {
    defaultInfo.value = {}

    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    newCb && newCb()
  }

  // 编辑用户
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }

    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    editCb && editCb(item)
  }

  return { pageModalRef, defaultInfo, handleNewData, handleEditData }
}
