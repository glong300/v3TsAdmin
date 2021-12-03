<template>
  <div class="l-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <slot name="headerHandler"></slot>
      </slot>
    </div>

    <el-table
      v-loading="tableLoading"
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>

      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop ?? ''] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        ></el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { ITableItem } from '@/base-ui/Table'

export default defineComponent({
  name: 'Table',
  components: {},
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 表格数据
    listData: {
      type: Array,
      default: () => []
    },
    // 数据数量
    listCount: {
      type: Number,
      default: 0
    },
    // 表格类型
    propList: {
      type: Array as PropType<ITableItem[]>,
      default: () => []
    },
    // 是否显示序号
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    // 是否显示选择框
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => {}
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    tableLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    // 获取选择的数据
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }

    return {
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style lang="less" scoped>
.l-table {
  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .footer {
    margin-top: 15px;

    .el-pagination {
      text-align: right;
    }
  }
}
</style>
