<template>
    <div>
        <div class="l-wrap">
            <div class="l-sidebar-article"></div>
            <div class="l-main-article">
                <form @submit.prevent="submit">
                    <div class="group">
                        <span>Studio</span>
                        <select name="studio_id" v-model="schedule.studio_id">
                            <option value="">--select studio--</option>
                            <option v-for="s in studios" :key="s.id" v-bind:value="s.id" selected="">{{ s.name }}</option>                            
                        </select>
                        <span class="invalid-feedback">
                            <strong></strong>
                        </span>
                    </div>

                    <div class="group">
                        <span>Movie</span>
                        <select name="movie_id" v-model="schedule.movie_id">
                            <option value="">--select movie</option>
                            <option v-for="m in movies" :key="m.id" v-bind:value="m.id" selected="">{{ m.name }}</option>
                        </select>
                        <span class="invalid-feedback">
                            <strong></strong>
                        </span>
                    </div>

                    <div class="group">
                        <span>Start Time</span>
                        <input id="start" type="datetime-local" v-model="schedule.start" name="start">
                    </div>

                    <button>Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

const baseURL = 'http://localhost:8000/v1/'

export default {
    props: ['schedule'],
    data() {
        return {
            movies: [],
            studios: [],
            user: JSON.parse(localStorage.getItem('user'))
        }
    },
    mounted() {
        this.getStudios()
        this.getMovies()
    },
    methods : {
        getStudios() {
            this.$axios.get(baseURL+'studios?token='+this.user.token)
            .then(response => {
                console.log(response.data)
                this.studios = response.data.data
            })
        },
        getMovies() {
            this.$axios.get(baseURL+'movies?token='+this.user.token)
            .then(response => {
                console.log(response.data)
                this.movies = response.data.data
            })
        },
        submit() {
            this.$axios.put(baseURL+'schedules/' + this.schedule.id + '?token='+this.user.token, {
                studio_id: this.schedule.studio_id,
                movie_id: this.schedule.movie_id,
                start: this.schedule.start
            })
            .then(response => {
                alert(response.data.message)
                this.$router.push({name: 'View Admin Schedule'})
            })
            .catch(error => {
                alert('invalid field')
            })
        }
    }
}
</script>