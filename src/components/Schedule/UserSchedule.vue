 <template>
    <div>
        <div class="l-wrap"> 
            <div class="l-sidebar-article"></div>
            <div class="l-main-article"> 
                <form @submit.prevent="searchSchedule">
                    <div class="group">
                        <select name="branch_id" v-model="searchData.branch_id">
                            <option value="">--select branch--</option>
                            <option v-for="branch in branches" :key="branch.id" v-bind:value="branch.id">{{ branch.name }}</option>
                        </select>
                        <input type="date" name="date" v-model="searchData.date" value="2021-05-01">
                        <button>Search Schedule</button>
                    </div>
                </form>
                <table>
                    <tbody>
                        <tr>
                            <th>Movie</th>
                            <th>Price</th>
                            <th>Start Time</th>
                        </tr>
                        <tr v-if="schedules == ''">
                            <td colspan="3" style="color: red;">Schedule is empty</td>
                        </tr>
                        <tr v-else v-for="schedule in schedules" :key="schedule.id">
                            <td>{{ schedule.name }}</td>
                            <td>{{ schedule.price }}</td>
                            <td>
                                <span v-for="s in schedule.start_time" :key="s" style="padding-left:5px;padding-right:5px">
                                    {{s}}, 
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

const baseURL = 'http://localhost:8000/v1/'

export default {
    data() {
        return {
            branches: [],
            schedules: [],
            searchData: {
                branch_id: '',
                date: '2021-05-01',
            },
            user: JSON.parse(localStorage.getItem('user'))
        }
    },
    mounted() {
        this.getBranches()
    },
    methods : {
        getBranches() {
            this.$axios.get(baseURL+'branch?token='+this.user.token)
            .then(response => {
                console.log(response.data)
                this.branches = response.data.data
            })
        },
        searchSchedule() {
            this.$axios.post(baseURL+'available-schedules?token='+this.user.token, {
                branch_id: this.searchData.branch_id,
                date: this.searchData.date
            })
            .then(response => {
                console.log(response.data)
                this.schedules = response.data.data
            })
        },
    }
}
</script>