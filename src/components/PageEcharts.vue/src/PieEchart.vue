<template>
  <div class="PieEchart">
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import BaseEchart from '@/base-ui/Echart'

import { EChartsOption } from 'echarts'
import { IDataType } from '../types'

const props = defineProps<{
  pieData: IDataType[]
}>()

const options = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})

options.value
</script>

<style lang="less" scoped>
.PieEchart {
}
</style>
