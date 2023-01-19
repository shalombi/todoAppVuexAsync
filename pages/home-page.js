import { showSuccessMsg } from '../services/event-bus.service.js'

export default {
    template: `
        <section class="home">
            <h1> HOME</h1>
            <span>
                Welcome to Todos App - cool application for make todo list.
            </span>
            
        </section>
    
    `,
    data() {
        return {
        }
    },
    created() {
        // showSuccessMsg('HomePage Loaded')
    },
    methods: {
    },
    computed: {
    }
}