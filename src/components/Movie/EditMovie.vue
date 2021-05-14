<template>
    <div>
        <div class="l-wrap">
            <div class="l-sidebar-article"></div>
            <div class="l-main-article">
                <form @submit.prevent="submit">                        
                    <div class="group">
                        <input id="name" type="text" name="name" v-model="movie.name" autocomplete="off">
                        <label for="name">Name</label>
                        <div class="bar"></div>
                    </div>
                    <div class="group">
                        <input id="minute_length" type="text" v-model="movie.minute_length" name="minute_length">
                        <label for="minute_length">Minute Length</label>
                        <div class="bar"></div>
                    </div>
                    <div>
                        <input id="update-picture" type="file" name="picture" required="">
                    </div>
                    <button>Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

const baseUrl = 'http://localhost:8000/v1/'

export default {
    props: ['movie'],
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user'))
        }
    },
    methods : {
        submit() {
            let data = new FormData()
            data.append('name', this.movie.name)
            data.append('minute_length', this.movie.minute_length)
            data.append('picture', document.querySelector('#update-picture').files[0])
            data.append('_method', 'put')
            // console.log(this.movie.name)
            this.$axios.post(baseUrl+'movies/' + this.movie.id +'?token='+this.user.token, data)
            .then(response => {
                // console.log(response)
                alert(response.data.message)
                this.$emit('finishUpdate')
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