import { todoService } from '../services/todo.service.js'

export default {
    props: ['todo'],
    template: `
        <section class="todo-preview" v-if="todo" >
            <p  @click="isTaskDone(todo)" 
            :class="{overline:todo.isDone }"
            class="cursor-pointer prev-todo-txt todo-txt" 
            > {{ todo.txt }}</p>
        </section>
        <!-- <section><pre>{{todo}}</pre></section> -->
    `,
    data() {
        return {
            isDone: null,
        }
    },

    methods: {
        isTaskDone(todo) {
            this.$store.dispatch({ type: "isDone", todo })
        },
    },
    computed: {
        lineStyle() {
            return { overline: this.isDone, mark: !this.isDone }
        },
    }
}