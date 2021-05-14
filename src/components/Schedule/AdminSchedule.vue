<template>
    <div>
        <div class="l-wrap">
            <div class="l-sidebar-article"></div>
            <div class="l-main-article">
                <router-link to="/schedule/create" class="button">Add New Schedule</router-link>

                <table>
                    <tbody>
                        <tr>
                            <th>Branch Name</th>
                            <th>Studio Name</th>
                            <th>Movie Name</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                        <tr v-for="schedule in schedules" :key="schedule.id">
                            <td>{{ schedule.studio.branch.name }}</td>
                            <td>{{ schedule.studio.name }}</td>
                            <td>{{ schedule.movie.name }}</td>
                            <td>{{ schedule.start }}</td>
                            <td>{{ schedule.end }}</td>
                            <td>{{ schedule.price }}</td>
                            <td>
                                <a class="button" v-on:click.prevent="updateSchedule(b)">Update</a>
                                <button v-on:click.prevent="deleteSchedule(b.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <EditSchedule v-if="isUpdating" v-bind:schedule="ub" v-on:finishUpdate="finishUpdate"></EditSchedule>
    </div>
</template>

<script>

const baseURL = 'http://localhost:8000/v1/'

import EditSchedule from './EditSchedule'

export default {
    data() {
        return {
            user : JSON.parse(localStorage.getItem('user')),
            schedules : [],
            isUpdating: false,
            ub: null
        }
    },
    mounted() {
        this.getSchedules()
    },
    methods : {
        getSchedules() {
            this.$axios.get(baseURL+'schedules?token='+this.user.token)
            .then(response => {
                console.log(response.data)
                this.schedules = response.data.data
            })
        },
        updateSchedule(movie) {
            this.isUpdating = true
            this.ub = movie
        },
        finishUpdate() {
            this.isUpdating = false
            this.getSchedules()
        },
        deleteSchedule(id) {
            this.$axios.delete(baseURL+'schedules/' + id + '?token=' + this.user.token)
            .then(response => {
                this.getSchedules()
                alert(response.data.message)
            })            
        }
    },
    components: {
        EditSchedule
    }
}
</script>