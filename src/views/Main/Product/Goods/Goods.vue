<template>
  <div class="goods">
    <PageSearch
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
      :searchFormConfig="searchFormConfig"
    />

    <PageContent ref="pageContentRef" pageName="goods" :contentTableConfig="contentTableConfig">
      <template #status="scope">
        <el-button plain size="mini" :type="scope.row.status ? 'success' : 'danger'">
          {{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #image="scope">
        <el-image
          style="width: 100px; max-height: 100px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
        ></el-image>
      </template>
      <template #oldPrice="scope">
        <span>￥{{ scope.row.oldPrice }}</span>
      </template>
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
  name: 'Goods',
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
