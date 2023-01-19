import todoPreview from './todo-preview.cmp.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
export default {
    props: ['todos'],
    template: `
        <section class="todo-list" >
          
            <!-- {{todos}} -->
            <ul>
                <li v-for="todo in todos" :key="todo.id">
                    <div>
                        <todo-preview :todo="todo"/>
                    </div>
                    <section class="actions">
                        <!-- <button @click="showDetails(todo)">Details</button> -->
                        <router-link :to="'/todo/' + todo._id"> <span class="details-task-btn">Details</span> </router-link> |
                        <router-link :to="'/todo/edit/' + todo._id"> <span class="edit-task-btn">Edit</span> </router-link> |
                        <button @click="remove(todo._id)" class="remove">x</button>
                    </section>
                    <!-- </div> -->
                </li>
            </ul>
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        remove(todoId) {
            this.$store.dispatch({ type: "remove", todoId })
                .then(() => {
                    showSuccessMsg(`Todo removed`)
                })
                .catch((err) => {
                    showErrorMsg(`Cannot remove todo`)
                })
        },
        showDetails(todo) {
            this.$emit('selected', todo)
        },
    },
    computed: {
    },
    components: {
        todoPreview,
    }
}