import { createApp } from 'vue'

// 引入函式庫 -start
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入函式庫 -end

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

// Vue實體使用函式庫 -start
app.use(ElementPlus)
// Vue實體使用函式庫 -end

app.use(store)
app.use(router)
app.mount('#app')
