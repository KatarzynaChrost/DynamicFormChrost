import { createApp } from 'vue'
import App from './App.vue'

// Import PrimeVue and its styles
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css' // Możesz wybrać inny temat
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css' // Jeśli chcesz korzystać z PrimeFlex

// Import specific PrimeVue components
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const app = createApp(App)

app.use(PrimeVue)

app.component('Button', Button)
app.component('InputText', InputText)

app.mount('#app')
