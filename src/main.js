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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    let user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
