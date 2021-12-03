import { Ref, ref } from 'vue'
import PageContent from '@/components/PageContent'

/**
 * @description 搜索组件方法
 * @author long
 * @date 2021-11-17 04:11:36
 * @returns { pageContentRef, handleQueryClick, handleResetClick }
 */
export default function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const resetLoading = ref(false)
  const queryLoading = ref(false)

  const handleQueryClick = (queryInfo: any, loading: Ref<boolean>) => {
    console.log('pageContentRef :>> ', pageContentRef.value)
    pageContentRef.value?.getPageData(queryInfo, [loading])
  }

  const handleResetClick = (loading: Ref<boolean>) => {
    pageContentRef.value?.getPageData({}, [loading])
  }

  return { queryLoading, resetLoading, pageContentRef, handleQueryClick, handleResetClick }
}
