import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import PrimeVue from 'primevue/config';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinus, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCaretDown)
library.add(faMinus)
import '@/assets/styles.scss'
const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(PrimeVue)

app.mount('#app')
