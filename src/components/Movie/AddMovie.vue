<template>
    <div>
        <div class="l-wrap">
            <div class="l-sidebar-article"></div>
            <div class="l-main-article">
                <form @submit.prevent="submit">                        
                    <div class="group">
                        <input id="name" type="text" name="name" v-model="movieData.name" autocomplete="off">
                        <label for="name">Name</label>
                        <div class="bar"></div>
                    </div>
                    <div class="group">
                        <input id="minute_length" type="text" v-model="movieData.minute_length" name="minute_length">
                        <label for="minute_length">Minute Length</label>
                        <div class="bar"></div>
                    </div>
                    <div>
                        <input id="picture" type="file" name="picture" required="">
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
            movieData : {
                name: '',
                minute_length: 0,
                // picture: document.querySelector('#picture').files[0]
            },
            user: JSON.parse(localStorage.getItem('user'))
        }
    },
    methods : {
        submit() {
            let data = new FormData()
            data.append('name', this.movieData.name)
            data.append('minute_length', this.movieData.minute_length)
            data.append('picture', document.querySelector('#picture').files[0])
            // console.log(this.movieData.name)
            this.$axios.post(baseUrl+'movies?token='+this.user.token, data)
            .then(response => {
                // console.log(response)
                alert(response.data.message)
                this.$router.push({name: 'View Movie'})
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