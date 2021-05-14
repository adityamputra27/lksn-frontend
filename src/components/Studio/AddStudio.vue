<template>
    <div>
        <div class="l-wrap">
            <div class="l-sidebar-article"></div>
            <div class="l-main-article">
                <form @submit.prevent="submit">                        
                    <div class="group">
                        <span>Branch</span>
                        <select name="branch_id" id="" v-model="studioData.branch_id">
                            <option value="">-- select branch --</option>
                            <option v-for="branch in branches" v-bind:value="branch.id" :key="branch.id">{{ branch.name }}</option>
                        </select>
                    </div>
                    <div class="group">
                        <input id="name" type="text" name="name" required="" autocomplete="off" v-model="studioData.name">
                        <label for="name">Name</label>
                        <div class="bar"></div>
                    </div>
                    <div class="group">
                        <input id="basic_price" type="text" name="basic_price" required="" autocomplete="off" v-model="studioData.basic_price">
                        <label for="basic_price">Basic Price</label>
                        <div class="bar"></div>
                    </div>
                    <div class="group">
                        <input id="additional_friday_price" type="text" name="additional_friday_price" required="" autocomplete="off" v-model="studioData.additional_friday_price">
                        <label for="additional_friday_price">Additional Friday Price</label>
                        <div class="bar"></div>
                    </div>
                    <div class="group">
                        <input id="additional_saturday_price" type="text" name="additional_saturday_price" required="" autocomplete="off" v-model="studioData.additional_saturday_price">
                        <label for="additional_saturday_price">Additional Saturday Price</label>
                        <div class="bar"></div>
                    </div>
                    <div class="group">
                        <input id="additional_sunday_price" type="text" name="additional_sunday_price" required="" autocomplete="off" v-model="studioData.additional_sunday_price">
                        <label for="additional_sunday_price">Additional Sunday Price</label>
                        <div class="bar"></div>
                    </div>
                    <button>Add</button>
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
            branches: [],
            studioData: {
                name: '',
                branch_id: 1,
                basic_price: 0,
                additional_friday_price: 0,
                additional_saturday_price: 0,
                additional_sunday_price: 0
            },
            user: JSON.parse(localStorage.getItem('user'))
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
        submit() {
            this.$axios.post(baseURL+'studios?token='+this.user.token, {
                name: this.studioData.name,
                branch_id: this.studioData.branch_id,
                basic_price: this.studioData.basic_price,
                additional_friday_price: this.studioData.additional_friday_price,
                additional_saturday_price: this.studioData.additional_saturday_price,
                additional_sunday_price: this.studioData.additional_sunday_price
            })
            .then(response => {
                alert(response.data.message)
                this.$router.push({name: 'View Studio'})
            })
            .catch(error => {
                alert('invalid field')
            })
        }
    }
}
</script>