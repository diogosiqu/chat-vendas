// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Quasar, * as All from 'quasar'
import router from './router'
import firebase from './plugins/firebase'
import Vuelidate from 'vuelidate'
import VueChatScroll from 'vue-chat-scroll'
import VueTyperPlugin from 'vue-typer'
import store from './store'
import axios from 'axios'
import VueMask from 'v-mask'
import EventBus from './plugins/bus'
import VueCookie from 'vue-cookie'

var http = axios.create({
  baseURL: 'https://www.rdstation.com.br/api/1.3/conversions',
  headers: {
    'Content-Type': 'application/json'
  }
})

Vue.prototype.$http = http
Vue.use(VueAnalytics, {
  id: 'UA-22061503-10'
})

Vue.use(VueMask)
Vue.use(VueCookie)
Vue.use(EventBus)
Vue.use(VueTyperPlugin)
Vue.use(VueChatScroll)
Vue.use(Vuelidate)
Vue.use(firebase, { router })
Vue.config.productionTip = false
Vue.use(Quasar, {
  components: All,
  directives: All
}) // Install Quasar Framework

if (__THEME === 'mat') {
  // require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'
/* eslint-disable no-new */
new Vue({
  el: '#q-app',
  store,
  router,
  render: h => h(require('./the-container').default)
})
