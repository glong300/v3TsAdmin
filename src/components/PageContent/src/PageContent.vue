<template>
  <div class="page-content">
    <LTable
      :tableLoading="tableLoading"
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header -->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" size="medium" @click="handleNewClick">
          {{ contentTableConfig.tableActionBtn?.create }}
        </el-button>
      </template>

      <!-- 表格数据 -->
      <template #createAt="scope">
        <div>{{ $filters.formatTime(scope.row.createAt) }}</div>
      </template>

      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>

      <!-- 右侧操作 -->
      <template #handler="scope">
        <el-button
          v-if="isUpdate"
          icon="el-icon-edit"
          size="mini"
          type="text"
          @click="handleEditClick(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          v-if="isDelete"
          icon="el-icon-delete"
          size="mini"
          type="text"
          @click="handleDeleteClick(scope.row)"
        >
          删除
        </el-button>
      </template>

      <!-- 动态插入剩余的插槽   -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>

      <!-- footer -->
    </LTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, Ref, watch } from 'vue'
import { useStore } from '@/store'

import LTable, { ITable } from '@/base-ui/Table'
import { usePermission } from '@/hooks/usePermission'
import { ITableDataListType } from './types'

export default defineComponent({
  name: 'PageContent',
  components: {
    LTable
  },
  props: {
    contentTableConfig: {
      type: Object as PropType<ITable>,
      default: () => {}
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    // table加载动画 -> 提示用户体验
    const tableLoading = ref(false)

    // 获取用户操作权限
    const isCreate = usePermission(props.pageName, 'create') // 创建权限
    const isUpdate = usePermission(props.pageName, 'update') // 更新权限
    const isDelete = usePermission(props.pageName, 'dalete') // 删除权限
    const isQuery = usePermission(props.pageName, 'query') // 查询权限

    // 分页器数据
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 发送网络请求获取 table 数据
    const getPageData = (quertInfo: any = {}, loading: Ref<boolean>[] = []) => {
      // 判断用户数是否有查询权限
      if (!isQuery) return

      tableLoading.value = true
      loading?.push(tableLoading)

      // 发送网络请求获取table数据
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...quertInfo
        },
        loading
      })
    }
    getPageData()

    // 从vuex中获取请求
    const dataList = computed<ITableDataListType>(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const dataCount = computed(() => store.getters['system/pageListCount'](props.pageName))

    // 动态获取其他插槽
    const otherPropSlots = props.contentTableConfig.propList.filter(item => {
      if (!item.slotName) return false
      // if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false

      return true
    })

    // 新建
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    // 编辑
    const handleEditClick = (item: ITableDataListType) => {
      emit('editBtnClick', item)
    }
    // 删除
    const handleDeleteClick = (item: ITableDataListType) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    return {
      dataList,
      dataCount,
      handleEditClick,
      handleDeleteClick,
      handleNewClick,
      getPageData,
      tableLoading,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
