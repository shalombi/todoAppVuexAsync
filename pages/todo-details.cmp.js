import { todoService } from "../services/todo.service.js"
import { storageService } from "../services/storage.service.js"


export default {
    template: `
        <section v-if="todo" class="todo-details">
            <h2>{{ todo.txt }}</h2>
            <!-- <img :src="imgUrl" alt=""> -->
            <!-- <button @click="$emit('close')">Close</button> -->
            <router-link to="/todo" class="back-to-app"><span>Back</span></router-link>
        </section>
        <h3 v-else>Loading...</h3>
    `,
    data() {
        return {
            todo: null,
        }
    },
    created() {
        const id = this.$route.params.id
        // const todo = todoService.getById(id)
        this.$store.dispatch({ type: "loadTodo", id })
            .then((todo) => {
                this.todo = todo
            })
    },
    computed: {
        imgUrl() {
            // return `../../img/${this.todo.vendor}.png`
        }
    }
}