import { App } from 'vue'
import registerElementPlus from './register-element'
import registerProperties from './register-properties'

export default {
  install(app: App): void {
    // 1. 函数式 注册Element-plus
    // registerElementPlus(app)
    // 2. 插件式 注册Element-plus
    app.use(registerElementPlus)
    app.use(registerProperties)
  }
}
