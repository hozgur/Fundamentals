
import { createApp } from 'vue'
import App from './App.vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)

const components = require.context('./components/core', true, /\/[a-zA-Z0-9]+\.vue$/)
components.keys().forEach(el => {    
    const name = String(components(el).default.name).toLowerCase()    
    app.component(`c-${name}`, components(el).default)
    console.log(`c-${name} loaded.`);
})

app.mount('#app');