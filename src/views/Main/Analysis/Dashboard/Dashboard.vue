<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <LCard title="分类商品数量(饼图)">
          <PieEchart :pieData="categoryGoodsCount"></PieEchart>
        </LCard>
      </el-col>
      <el-col :span="10">
        <LCard title="不同城市商品销量">
          <MapEchart :mapData="addressGoodsSale"></MapEchart>
        </LCard>
      </el-col>
      <el-col :span="7">
        <LCard title="分类商品数量(玫瑰图)">
          <RoseEchart :roseData="categoryGoodsCount"></RoseEchart>
        </LCard>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <LCard title="分类商品的销量">
          <LineEchart v-bind="categoryGoodsSale"></LineEchart>
        </LCard>
      </el-col>
      <el-col :span="12">
        <LCard title="分类商品的收藏">
          <BarEchart v-bind="categoryGoodsFavor"></BarEchart>
        </LCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import LCard from '@/base-ui/Card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/PageEcharts.vue'

export default defineComponent({
  name: 'dashboard',
  components: {
    LCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const store = useStore()
    // 请求数据
    store.dispatch('dashboard/getDashboardDataAction')

    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale

      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }

      return {
        xLabels,
        values
      }
    })
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor

      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }

      return {
        xLabels,
        values
      }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 20px;
}
</style>
