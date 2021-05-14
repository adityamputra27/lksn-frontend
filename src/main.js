import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import axios from '../node_modules/axios'
import './assets/add_branch_files/style.css'
import './assets/add_movie_files/style.css'
import './assets/login_files/style.css'
import './assets/update_branch_files/style.css'
import './assets/update_movie_files/style.css'
import './assets/update_schedule_files/style.css'
import './assets/update_studio_files/style.css'
import './assets/view_branch_files/style.css'
import './assets/view_movie_files/style.css'
import './assets/view_schedule_admin_files/style.css'
import './assets/view_schedule_user_files/style.css'
import './assets/view_studio_files/style.css'

Vue.use(VueRouter)

axios.defaults.baseURL = "http://localhost:8000/v1"
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
