
import { todoService } from '../services/todo.service.js'
import { eventBus } from '../services/event-bus.service.js'

import todoFilter from '../cmps/todo-filter.cmp.js'
import todoList from '../cmps/todo-list.cmp.js'

export default {
    template: `

    <section v-if="isLoading">Loading application...</section>
    <section class="todo-app" v-else>
        <todo-filter @setFilterBy="setFilterBy"/>

       <div class="container-add">
           <router-link to="/todo/edit"><span class="add">Add a todo...</span></router-link>
       </div>

        <todo-list v-if="todos && todos.length" 
            @selected="selectTodo" 
            :todos="todos"/>
    </section>
    `,
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch({type:"loadTodos"})
    },
    methods: {
        setFilterBy(filterBy) {
            this.$store.commit({ type: 'setFilterBy', filterBy })
        },
    },
    computed: {
        todos() {
            return this.$store.getters.todosForDisplay
        },
        isLoading(){
            return this.$store.getters.isLoading
        }
    },
    components: {
        todoFilter,
        todoList,
    }
}

