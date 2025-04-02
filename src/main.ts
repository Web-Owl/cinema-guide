import '@/assets/styles/style.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import BaseIcon from '@/components/base/BaseIcon.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { useVuelidate } from '@vuelidate/core'

const app = createApp(App)
app.component('BaseIcon', BaseIcon)
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.use(useVuelidate)

app.mount('#app')
