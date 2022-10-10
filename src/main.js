import { createApp } from 'vue'

// 引入函式庫 -start
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入函式庫 -end

import axios from "axios"

import App from './App.vue'
import router from './router'
import store from './store'

/* import the fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faSearch, faClone, faList, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUserSecret, faSearch, faClone, faList, faFilter, faMagnifyingGlass)

import Header from '@/components/layout/Header.vue'



const app = createApp(App)

// Vue實體使用函式庫 -start
app.use(ElementPlus)
// Vue實體使用函式庫 -end

app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('MainLogo', Header)

app.config.globalProperties.axios=axios
app.mount('#app')
