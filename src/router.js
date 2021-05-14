import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Auth/Login'
import ViewBranch from './components/Branch/ViewBranch'
import AddBranch from './components/Branch/AddBranch'
import ViewMovie from './components/Movie/ViewMovie'
import AddMovie from './components/Movie/AddMovie'
import ViewStudio from './components/Studio/ViewStudio'
import AddStudio from './components/Studio/AddStudio'
import AdminSchedule from './components/Schedule/AdminSchedule'
import UserSchedule from './components/Schedule/UserSchedule'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/branch',
        name: 'View Branch',
        component: ViewBranch
    },
    {
        path: '/branch/create',
        name: 'Add Branch',
        component: AddBranch
    },
    {
        path: '/movie',
        name: 'View Movie',
        component: ViewMovie
    },
    {
        path: '/movie/create',
        name: 'Add Movie',
        component: AddMovie
    },
    {
        path: '/studio',
        name: 'View Studio',
        component: ViewStudio
    },
    {
        path: '/studio/create',
        name: 'Add Studio',
        component: AddStudio
    },
    {
        path: '/schedule',
        name: 'View Admin Schedule',
        component: AdminSchedule
    },
    {
        path: '/view-schedule',
        name: 'View Schedule',
        component: UserSchedule
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router