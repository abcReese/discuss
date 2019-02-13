import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import common from './styles/common.styl'
import VueSocketio from 'vue-socket.io';

import socketio from 'socket.io-client';

Vue.use( new VueSocketio({
  connection:'http://localhost:3000'
}));  


const ipcRenderer = require('electron').ipcRenderer
Vue.prototype.$ipc= ipcRenderer;



if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.$url="http://localhost:3000";

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
