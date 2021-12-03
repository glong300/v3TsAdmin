<template>
  <div class="page-search">
    <!-- 搜索页 -->
    <LForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" :loading="resetLoading" @click="handleResetClick">
            重置
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-search"
            :loading="queryLoading"
            @click="handleQueryClick"
          >
            搜索
          </el-button>
        </div>
      </template>
    </LForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'

import LForm, { IForm } from '@/base-ui/Form'
import usePageSearch from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'PageSearch',
  components: {
    LForm
  },
  props: {
    searchFormConfig: {
      type: Object as PropType<IForm>,
      default: () => {}
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    const { queryLoading, resetLoading } = usePageSearch()

    // 双向绑定的属性应该是由配置文件的field来决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formData = ref(formOriginData)

    // 用户点击重置
    const handleResetClick = () => {
      // 第一种方法
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      // 第二种
      formData.value = formOriginData

      resetLoading.value = true
      emit('resetBtnClick', resetLoading)
    }

    // 用户点击搜索
    const handleQueryClick = () => {
      queryLoading.value = true

      emit('queryBtnClick', formData.value, queryLoading)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick,
      queryLoading,
      resetLoading
    }
  }
})
</script>

<style lang="less" scoped>
.page-search {
  .header {
    color: red;
  }
  .handle-btns {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>
