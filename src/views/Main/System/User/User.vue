<template>
  <div class="user">
    <!-- 通用检索组件 -->
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />
    <!-- table内容组件 -->
    <PageContent
      ref="pageContentRef"
      pageName="users"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #status="scope">
        <el-button plain size="mini" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </PageContent>

    <PageModal
      ref="pageModalRef"
      pageName="users"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
    ></PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

// 组件
import PageSearch from '@/components/PageSearch'
import PageContent from '@/components/PageContent'
import PageModal from '@/components/PageModal'

// 配置文件
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/model.config'

// 全局 hook 逻辑操作
import usePageSearch from '@/hooks/usePageSearch'
import usePageModal from '@/hooks/usePageModal'

export default defineComponent({
  name: 'User',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 获取搜索组件操作功能
    const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()

    // modal相关的hook逻辑
    // 处理弹窗框某些输入框需要隐藏逻辑
    const passwordItem = modalConfig.formItems.find(item => item.field === 'password')
    const newCallback = () => {
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      passwordItem!.isHidden = true
    }
    const { pageModalRef, defaultInfo, handleNewData, handleEditData } = usePageModal(
      newCallback,
      editCallback
    )

    // 动态添加部门和角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(item => item.field === 'departmentId')
      const roleItem = modalConfig.formItems.find(item => item.field === 'roleId')
      if (departmentItem?.type === 'select') {
        departmentItem.options = store.state.entireDepartment.map(item => {
          return { label: item.name, value: item.id }
        })
      }
      if (roleItem?.type === 'select') {
        roleItem.options = store.state.entireRole.map(item => {
          return { label: item.name, value: item.id }
        })
      }

      return modalConfig
    })

    console.log('modalConfig :>> ', modalConfig)

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      // 搜索
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      // 表格操作
      handleNewData,
      handleEditData,
      // 新建操作
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style lang="less" scoped>
.user {
  font-size: 16px;
}
</style>
