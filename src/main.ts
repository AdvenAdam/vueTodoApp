import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
app.component('VueDatePicker', VueDatePicker)
