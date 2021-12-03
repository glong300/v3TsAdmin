import * as echarts from 'echarts'
import ChinaMapData from '../data/china.json'

echarts.registerMap('china', ChinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 重绘方法
  const updateResize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    // 窗口发生变化的时候重绘
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateResize
  }
}
