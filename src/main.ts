import { createApp } from 'vue'
import App from './App.vue'

// 引入Element-plus样式文件
import 'element-plus/dist/index.css'
import 'normalize.css'
// 全局css
import './assets/css/index.less'

import globalRegisterApp from './global'
import router from './router'
import store, { setupStore } from './store'

const app = createApp(App)

app.use(globalRegisterApp)
app.use(store)

// 初始化store
setupStore()

app.use(router)

app.mount('#app')

export default app
