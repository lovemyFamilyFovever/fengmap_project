import Vue from 'vue'
import App from './App.vue'

import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

import Loading from "./components/Loading"

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('/')
}))

Vue.component('Loading', Loading)

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  render: h => h(App),
}).$mount('#app')