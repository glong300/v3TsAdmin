<template>
  <div class="menu">
    <!-- 通用检索组件 -->
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    />

    <!-- table内容组件 -->
    <PageContent ref="pageContentRef" pageName="menu" :contentTableConfig="contentTableConfig">
      <!-- <template #status="scope">
        <el-button plain size="mini" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template> -->
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 组件
import PageSearch from '@/components/PageSearch'
import PageContent from '@/components/PageContent'

// 配置文件
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import usePageSearch from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'User',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const { pageContentRef, handleQueryClick, handleResetClick } = usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick
    }
  }
})
</script>

<style scoped></style>
