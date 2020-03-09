import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import DupesGridLauncher from './components'

import moment from 'moment'

Vue.filter('formatDT', function (value) {
  if (value) {
    return moment(String(value)).utc().format('YYYY-MM-DD H:m:s')
  }
})

Vue.use(Vuetify)
Vue.use(DupesGridLauncher)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
})
