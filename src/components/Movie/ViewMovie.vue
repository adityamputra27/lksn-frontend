<template>
    <div>
        <div class="l-wrap" v-if="!isUpdating">
            <div class="l-sidebar-article"></div>
                <div class="l-main-article">
                <router-link to="/movie/create" class="button">Add New Movie</router-link>
                <table>
                    <tbody>
                        <tr>
                            <th>PICTURE</th>
                            <th>MOVIE NAME</th>
                            <th>MINUTE LENGTH</th>
                            <th>ACTION</th>
                        <tr>
                        <tr v-for="b in movies" v-bind:key="b.id">
                            <td><img v-bind:src="b.picture" alt=""></td>
                            <td>{{ b.name }}</td>
                            <td>{{ b.minute_length }}</td>
                            <td>
                                <a class="button" v-on:click.prevent="updateMovie(b)">Update</a>
                                <button v-on:click.prevent="deleteMovie(b.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <EditMovie v-if="isUpdating" v-bind:movie="ub" v-on:finishUpdate="finishUpdate"></EditMovie>
    </div>
</template>

<script>

const baseURL = 'http://localhost:8000/v1/'

import EditMovie from './EditMovie'

export default {
    data() {
        return {
            user : JSON.parse(localStorage.getItem('user')),
            movies : [],
            isUpdating: false,
            ub: null
        }
    },
    mounted() {
        this.getMovies()
    },
    methods : {
        getMovies() {
            this.$axios.get(baseURL+'movies?token='+this.user.token)
            .then(response => {
                console.log(response.data)
                this.movies = response.data.data
            })
        },
        updateMovie(movie) {
            this.isUpdating = true
            this.ub = movie
        },
        finishUpdate() {
            this.isUpdating = false
            this.getMovies()
        },
        deleteMovie(id) {
            this.$axios.delete(baseURL+'movies/' + id + '?token=' + this.user.token)
            .then(response => {
                this.getMovies()
                alert(response.data.message)
            })            
        }
    },
    components: {
        EditMovie
    }
}
</script>

<style scoped>
    img {
        width: 50%;
        object-fit: cover;
    }
</style>