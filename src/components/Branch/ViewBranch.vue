<template>
    <div>
        <div class="l-wrap" v-if="!isUpdating">
            <div class="l-sidebar-article"></div>
                <div class="l-main-article">
                <router-link to="/branch/create" class="button">Add New Branch</router-link>
                <table>
                    <tbody>
                        <tr>
                            <th>BRANCH NAME</th>
                            <th>ACTION</th>
                        <tr>
                        <tr v-for="b in branches" v-bind:key="b.id">
                            <td>{{ b.name }}</td>
                            <td>
                                <a class="button" v-on:click.prevent="updateBranch(b)">Update</a>
                                <button v-on:click.prevent="deleteBranch(b.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <EditBranch v-if="isUpdating" v-bind:branch="ub" v-on:finishUpdate="finishUpdate"></EditBranch>
    </div>
</template>

<script>

const baseURL = 'http://localhost:8000/v1/'

import EditBranch from './EditBranch'

export default {
    data() {
        return {
            user : JSON.parse(localStorage.getItem('user')),
            branches : [],
            isUpdating: false,
            ub: null
        }
    },
    mounted() {
        this.getBranches()
    },
    methods : {
        getBranches() {
            this.$axios.get(baseURL+'branches?token='+this.user.token)
            .then(response => {
                console.log(response.data)
                this.branches = response.data.data
            })
        },
        updateBranch(branch) {
            this.isUpdating = true
            this.ub = branch
        },
        finishUpdate() {
            this.isUpdating = false
            this.getBranches()
        },
        deleteBranch(id) {
            this.$axios.delete(baseURL+'branches/' + id + '?token=' + this.user.token)
            .then(response => {
                this.getBranches()
                alert(response.data.message)
            })            
        }
    },
    components: {
        EditBranch
    }
}
</script>