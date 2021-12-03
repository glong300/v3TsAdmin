<template>
  <div class="page-modal">
    <el-dialog
      :title="modalConfig.title"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <LForm v-bind="modalConfig" v-model="formData"></LForm>

      <slot></slot>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'
import { useStore } from '@/store'

import LForm, { IForm } from '@/base-ui/Form'

export default defineComponent({
  name: 'PageModal',
  components: {
    LForm
  },
  props: {
    modalConfig: {
      type: Object as PropType<IForm>,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data(props) {
    // 弹窗的显示
    const dialogVisible = ref(false)
    // form表单数据
    const formData = ref<any>({})
    // 检测默认数据是否发生变化
    watch(
      () => props.defaultInfo,
      newValue => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 确定按钮逻辑
    const store = useStore()
    const handleConfirmClick = () => {
      // 关闭弹窗
      dialogVisible.value = false

      // 判断是否传入默认数据来判断是新建还是编辑
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          pageData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 创建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          pageData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style lang="less" scoped>
.page-modal {
}
</style>
