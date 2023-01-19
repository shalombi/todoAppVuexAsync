import {utilService} from '../services/util.service.js'

export default {
    template: `
    <section class="todo-filter-container container m-b-s">
        <!-- <span>Filter</span> -->
        <input class="input-filter" type="search" v-model="filterBy.txt" placeholder="🔎 Search task"  @input="setFilterBy"/>
        <select v-model="filterBy.status" @change="setFilterBy">
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Done">Done</option>
        </select>
    </section>
    `,

    data() {
        return {
            filterBy: {
                txt: '',
                status: 'All',
            },
        }
    },

    methods: {

        setFilterBy() {

            this.setFilterBy = utilService.debounce(()=>{
                this.$emit('setFilterBy', { ...this.filterBy })
                console.log('Performing search')
            })

        },
    }
}