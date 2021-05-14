<template>
    <div>
        <div class="l-wrap">
            <div class="l-sidebar-article"></div>
            <div class="l-main-article">
                <form @submit.prevent="submit">                        
                    <div class="group">
                        <input id="name" type="text" name="name" autocomplete="off" v-model="branchData.name" value="">
                        <label for="name">Name</label>
                        <div class="bar"></div>
                    </div>
                    <button>Add</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

const baseUrl = 'http://localhost:8000/v1/'

export default {
    data() {
        return {
            branchData : {
                name: ''
            },
            user: JSON.parse(localStorage.getItem('user'))
        }
    },
    methods : {
        submit() {
            // console.log(this.branchData.name)
            this.$axios.post(baseUrl+'branches?token='+this.user.token, this.branchData)
            .then(response => {
                // console.log(response)
                alert(response.data.message)
                this.$router.push({name: 'View Branch'})
            })
            .catch(error => {
                // console.log(error)
                if(error.response.status == 422) {
                    alert(error.response.data.message.name)
                }
            })
        }
    }
}
</script>