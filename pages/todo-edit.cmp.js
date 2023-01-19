import { todoService } from "../services/todo.service.js"
import { eventBus, showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

export default {
    template: `
        <section class="todo-edit">
            <h1>Todo Edit</h1>
            <form @submit.prevent="save" v-if="todoToEdit">
                <input type="text" v-model="todoToEdit.txt" autofocus>
                <button ref="btn">Save</button>
            </form>
        </section>
        <pre>{{todoToEdit}}</pre>
    `,
    data() {
        return {
            todoToEdit: null,
        }
    },
    created() {
        const todoId = this.$route.params.id
        if (todoId) {
            todoService.getById(todoId)
                .then((todo) => {
                    this.todoToEdit = todo
                })
        } else {
            this.todoToEdit = todoService.getEmptyTodo()
        }
    },
    mounted() {
    },
    methods: {
        save() {
            if (!this.todoToEdit.txt.length) return
            this.$store.dispatch({ type: "saveTodo", todo: this.todoToEdit })
                .then((todoId) => {
                    showSuccessMsg(`todo Saved ( id:${todoId} )`)
                })
                .catch(() => {
                    showErrorMsg(`OOPS,not now...`)
                })

            this.todoToEdit = null
            this.$router.push('/todo')
        }
    }
}