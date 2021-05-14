<template>
    <div>
        <div class="l-wrap" v-if="!isUpdating">
            <div class="l-sidebar-article"></div>
                <div class="l-main-article">
                <router-link to="/studio/create" class="button">Add New Studio</router-link>
                <table>
                    <tbody>
                        <tr>
                            <th>BRANCH NAME</th>
                            <th>STUDIO NAME</th>
                            <th>BASIC PRICE</th>
                            <th>+ FRIDAY</th>
                            <th>+ SATURDAY</th>
                            <th>+ SUNDAY</th>
                            <th>ACTION</th>
                        <tr>
                        <tr v-for="b in studios" v-bind:key="b.id">
                            <td>{{ b.branch.name }}</td>
                            <td>{{ b.name }}</td>
                            <td>{{ b.basic_price }}</td>
                            <td>{{ b.additional_friday_price }}</td>
                            <td>{{ b.additional_saturday_price }}</td>
                            <td>{{ b.additional_sunday_price }}</td>
                            <td>
                                <a class="button" v-on:click.prevent="updateStudio(b)">Update</a>
                                <button v-on:click.prevent="deleteStudio(b.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <EditStudio v-if="isUpdating" v-bind:studio="ub" v-on:finishUpdate="finishUpdate"></EditStudio>
    </div>
</template>

<script>

const baseURL = 'http://localhost:8000/v1/'

import EditStudio from './EditStudio'

export default {
    data() {
        return {
            user : JSON.parse(localStorage.getItem('user')),
            studios : [],
            isUpdating: false,
            ub: null
        }
    },
    mounted() {
        this.getStudios()
    },
    methods : {
        getStudios() {
            this.$axios.get(baseURL+'studios?token='+this.user.token)
            .then(response => {
                console.log(response.data)
                this.studios = response.data.data
            })
        },
        updateStudio(movie) {
            this.isUpdating = true
            this.ub = movie
        },
        finishUpdate() {
            this.isUpdating = false
            this.getStudios()
        },
        deleteStudio(id) {
            this.$axios.delete(baseURL+'studios/' + id + '?token=' + this.user.token)
            .then(response => {
                alert(response.data.message)
                this.getStudios()
            })            
        }
    },
    components: {
        EditStudio
    }
}
</script>

<style scoped>
    img {
        width: 50%;
        object-fit: cover;
    }
</style>