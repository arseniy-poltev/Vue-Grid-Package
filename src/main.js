import './stylus/main.styl'
import Vue from 'vue'
import vuetify from './plugins/vuetify'

import App from './app'

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
