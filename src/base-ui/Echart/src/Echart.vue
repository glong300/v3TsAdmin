<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'

import userEchart from '../hooks/useEchart'
import { EChartsOption } from 'echarts'

// props
const props = withDefaults(
  // 定义props
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  // 设置默认值
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = userEchart(echartDivRef.value!)

  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style lang="less" scoped>
.base-echart {
}
</style>
