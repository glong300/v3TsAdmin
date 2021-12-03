<template>
  <div class="role">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></PageSearch>

    <PageContent
      ref="pageContentRef"
      pageName="role"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></PageContent>

    <PageModal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
      pageName="role"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        ></el-tree>
      </div>
    </PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { useStore } from '@/store'
import { EntireRoleType } from '@/store/types'

import { ElTree } from 'element-plus'
import PageSearch from '@/components/PageSearch'
import PageContent from '@/components/PageContent'
import PageModal from '@/components/PageModal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import usePageSearch from '@/hooks/usePageSearch'
import usePageModal from '@/hooks/usePageModal'
import { menuMapLeafKeys } from '@/hooks/index'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const store = useStore()

    const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()

    // 设置默认数据
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: EntireRoleType) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    // modelhook 逻辑操作
    const { pageModalRef, defaultInfo, handleNewData, handleEditData } = usePageModal(
      undefined,
      editCallback
    )

    // 获取权限菜单
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    // tree 选择事件
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      handleQueryClick,
      handleResetClick,

      pageContentRef,
      contentTableConfig,

      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      elTreeRef,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
