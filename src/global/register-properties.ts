import { App } from 'vue'
import { ElMessage } from 'element-plus'

import moment from '@/utils/moment'

export default function (app: App) {
  // 设置全局方法
  app.config.globalProperties.$filters = {
    formatTime(date: string | number) {
      return moment(date).format()
    }
  }
  app.config.globalProperties.$message = ElMessage
}
