import Vue from 'vue'
import App from './App.vue'
import router from './router';
import moment from 'moment';
import { MdButton } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdButton);
Vue.use(moment);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
