<template>
    <div>
        <div class="top-bar" v-if="user != null && user.role == 'admin' && isLoggedIn">
            <router-link to="/branch">Branch</router-link>
            <router-link to="/studio">Studio</router-link>
            <router-link to="/movie">Movie</router-link>
            <router-link to="/schedule">Schedule</router-link>
            <a href="" @click.prevent="logout">Logout</a>
        </div>
        <div class="top-bar" v-if="user != null && user.role == 'user' && isLoggedIn">
            Welcome To Cinema XIX
            <router-link to="/view-schedule">Schedule</router-link>
            <!-- <a href="#" @click="logout">Logout</a> -->
        </div>
        <h2 v-if="isLoggedIn && user != null" style="margin-left: 4.5em;">Welcome, {{ user.username }}. Your Role is {{ user.role }}</h2>
        <router-view/>
    </div>
</template>

<script>

    const baseURL = 'http://localhost:8000/v1/'

    import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'app',
        components: {
            HelloWorld
        },
        data() {
            return {
                user: null,
                isLoggedIn: false
            }
        },
        created() {
            this.getUser()
            
        },
        methods: {
            getUser() {
                let user = JSON.parse(localStorage.getItem('user'))
                this.user = user
                this.isLoggedIn = true
                // console.log(this.user)
            },
            logout() {
                this.$axios.get(baseURL+'auth/logout?token='+this.user.token)
                .then(response => {
                    // let confirmLogout = confirm('Are you sure want to logout, from this page?');
                    console.log(response)
                    // if(confirmLogout == true) {
                        localStorage.removeItem('user')
                        this.$router.push({name: 'Login'})
                        this.isLoggedIn = false
                    // }
                })
                .catch(error => {
                    if(error.response.status == 401) {
                        this.$router.push({name: 'Login'})
                    }
                })
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
