<template>
    <div>
        <div class="l-wrap">
            <div class="l-sidebar-article"></div>
            <div class="l-main-article">
                <form @submit.prevent="submit">                        
                    <div class="group">
                        <span>Branch</span>
                        <select name="branch_id" id="" v-model="studio.branch_id">
                            <option value="">-- select branch --</option>
                            <option v-for="branch in branches" v-bind:value="branch.id" :key="branch.id">{{ branch.name }}</option>
                        </select>
                    </div>
                    <div class="group">
                        <input id="name" type="text" name="name" required="" autocomplete="off" v-model="studio.name">
                        <label for="name">Name</label>
                        <div class="bar"></div>
                    </div>
                    <div class="group">
                        <input id="basic_price" type="text" name="basic_price" required="" autocomplete="off" v-model="studio.basic_price">
                        <label for="basic_price">Basic Price</label>
                        <div class="bar"></div>
                    </div>
                    <div class="group">
                        <input id="additional_friday_price" type="text" name="additional_friday_price" required="" autocomplete="off" v-model="studio.additional_friday_price">
                        <label for="additional_friday_price">Additional Friday Price</label>
                        <div class="bar"></div>
                    </div>
                    <div class="group">
                        <input id="additional_saturday_price" type="text" name="additional_saturday_price" required="" autocomplete="off" v-model="studio.additional_saturday_price">
                        <label for="additional_saturday_price">Additional Saturday Price</label>
                        <div class="bar"></div>
                    </div>
                    <div class="group">
                        <input id="additional_sunday_price" type="text" name="additional_sunday_price" required="" autocomplete="off" v-model="studio.additional_sunday_price">
                        <label for="additional_sunday_price">Additional Sunday Price</label>
                        <div class="bar"></div>
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
    props: ['studio'],
    data() {
        return {
            branches: [],
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
                // console.log(response.data)
                this.branches = response.data.data
            })
        },
        submit() {
            this.$axios.put(baseURL+'studios/' + this.studio.id + '?token='+this.user.token, {
                name: this.studio.name,
                branch_id: this.studio.branch_id,
                basic_price: this.studio.basic_price,
                additional_friday_price: this.studio.additional_friday_price,
                additional_saturday_price: this.studio.additional_saturday_price,
                additional_sunday_price: this.studio.additional_sunday_price
            })
            .then(response => {
                alert(response.data.message)
                this.$emit('finishUpdate')
            })
            .catch(error => {
                alert('invalid field')
            })
        }
    }
}
</script>