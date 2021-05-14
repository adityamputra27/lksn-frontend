<template>
    <div>
        <div class="top-bar">
            <h1>Cinema XIX</h1>
        </div>
        <div class="l-wrap">
            <div class="l-sidebar-article"></div>
            <div class="l-main-article">
                <form @submit.prevent="login">
                    <div class="group">
                        <input id="username" type="text" name="username" v-model="loginData.username" autocomplete="off" value="" required="">
                        <label for="username">Username</label>
                        <div class="bar"></div>
                        <div style="color: red;" v-if="errors.username">{{ errors.username[0] }}</div>
                    </div>

                    <div class="group">
                        <input id="password" type="password" name="password" v-model="loginData.password" autocomplete="off" value="" required="">
                        <label for="password">Password</label>
                        <div class="bar"></div>
                        <div style="color: red;" v-if="errors.password">{{ errors.password[0] }}</div>                        
                    </div>

                    <div>
                        <button type="submit">
                        Login
                        </button>
                        <a href="" class="button">
                        Register
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>

const baseURL = 'http://localhost:8000/v1/'

export default {
    data() {
        return {
            loginData : {
                username: '',
                password: '',
            },
            errors: {}
        }
    },
    mounted() {
        let user = localStorage.getItem('user')
        if(user) {
            this.$emit('login')
        }
    },
    methods: {
        login() {
            this.$axios.post(baseURL+'auth/login', this.loginData)
            .then(response => {
                console.log(response.data)
                let token = response.data.token
                let role = response.data.role
                let username = this.loginData.username
                let user = {
                    token,role,username
                }
                localStorage.setItem('user', JSON.stringify(user))
                // console.log(user.token)

                this.$emit('login')

                alert(response.data.message)

                this.$router.push('/')
            })
            .catch((error) => {
                // console.log(error.response.status)
                if (error.response.status == 422) { 
                    // console.log(error.response.data)
                    this.errors = error.response.data.message
                    console.log(this.errors)
                } 
                else if (error.response.status == 401) {
                    alert(error.response.data.message)
                }
            })
        }
    }
}
</script>