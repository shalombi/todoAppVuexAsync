// import userMsg from './user-msg.js'
import userMsg from './user-msg.js'

export default {
    template: `
            <header>
                <section class="user-info">
                    </section>
                    
                    <h1 class="main-title">Todos App <span>.</span></h1> 
                    
                    <nav>
                        <router-link class="router-link"to="/">Home</router-link> 
                        <span>|</span> 
                        <router-link class="router-link" to="/todo">Todos</router-link>
                    </nav>
                    <user-msg/>
            </header>
    `,
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {

    },
    components: {
        userMsg,
    },
}
