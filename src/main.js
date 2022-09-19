import './plugins/bootstrap-vue'
import './plugins/icons-vue'

import { BootstrapVue } from 'bootstrap-vue'

import Vue from 'vue'
import VueRouter from 'vue-router'
import PortalVue from 'portal-vue'
import VueSocialSharing from 'vue-social-sharing'

import App from './App.vue'
import routes from './router'
import guards from './router/guards'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueSocialSharing)
Vue.use(PortalVue)
Vue.use(VueRouter)
Vue.use(BootstrapVue)

const mode = ''
const router = guards({ router: new VueRouter({ routes, mode }) })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
