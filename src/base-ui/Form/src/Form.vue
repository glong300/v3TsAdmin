<template>
  <div class="l-form">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="(item, index) in formItems" :key="index">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              v-if="!item.isHidden"
            >
              <!-- 正常输入框 -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  type="text"
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>

              <!-- 下拉选择框 -->
              <template v-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </template>

              <!-- 时间选择器 -->
              <template v-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.dateOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { IFromItem } from '../types'

export default defineComponent({
  name: 'LForm',
  components: {},
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFromItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 0' })
    },
    colLayout: {
      type: Object, // => { span: number }
      default: () => ({
        xl: 7,
        ls: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 第一种方法
    // const fromData = ref({ ...props.modelValue })

    // watch(
    //   fromData,
    //   newValue => {
    //     emit('update:modelValue', newValue)
    //   },
    //   { deep: true }
    // )

    // 第二种方法
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return {
      handleValueChange
    }
  }
})
</script>

<style lang="less" scoped>
.l-form {
  padding: 22px;
}
</style>
