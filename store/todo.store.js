import { todoService } from '../services/todo.service.js'

export const todoModule = {
    state() {
        return {
            todos: [],
            filterBy: null,
            isLoading:false,
        }
    },
    mutations: {

        removeTodo(state, { todoId }) {
            const idx = state.todos.findIndex(todo => todo._id === todoId)
            state.todos.splice(idx, 1)

        },
        isDone(state, { todoId }) {
            const idx = state.todos.findIndex(todo => todo._id === todoId)
            const todo = state.todos[idx]
            todo.isDone = !todo.isDone
        },
        setFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
        },
        saveTodo({ todos }, { todo }) {
            const savedTodo = todoService.save(todo)
            // const idx = todos.findIndex(({ _id }) => _id === todo._id)
            const idx = todos.findIndex((currTodo) => currTodo._id === todo._id)

            if (idx !== -1) todos.splice(idx, 1, savedTodo)
            else todos.push(savedTodo)
            return savedTodo
        },
        setTodos(state, { todos }) {
            state.todos = todos
        },
        setTodoById(state, { todo }) {
            state.todoById = todo
        },
        setIsLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },

    },
    getters: {
        todosForDisplay(state) {
            let filteredTodos
            if (!state.filterBy) return state.todos

            const { txt, status } = state.filterBy
            if (status === 'Active') {
                filteredTodos = state.todos.filter((todo) => !todo.isDone)
            } else if (status === 'Done') {
                filteredTodos = state.todos.filter((todo) => todo.isDone)
            } else {
                filteredTodos = state.todos
                console.log(filteredTodos, 'Status All , filteredTodos')
            }
            filteredTodos = filteredTodos.filter((todo) => new RegExp(txt, 'i').test(todo.txt))
            return filteredTodos
        },
        isLoading({isLoading}){
            return isLoading
        }
    },
    actions: {
        loadTodos(context) {

            context.commit({type:"setIsLoading",isLoading:true})

            return todoService.query()
                .then((todos) => {
                    context.commit({ type: "setTodos", todos })
                    return todos
                })
                .catch(err => {
                    console.log('Cannot load todos', err)
                    throw err
                })
                
                .finally(() => {
                    context.commit({ type: 'setIsLoading', isLoading: false })
                  })
        },
        loadTodo(context, { id }) {
            return todoService.getById(id)
                .then((todo) => {
                    context.commit({ type: "setTodoById", todo })
                    return todo
                })
                .catch(err => {
                    console.log('Cannot load todo', err)
                    throw err
                })
        },
        remove(context, { todoId }) {
            todoService.remove(todoId)
                .then(() => {
                    context.commit({ type: "removeTodo", todoId })
                })
                .catch((err) => {
                    console.log('Cannot remove now')
                    throw err
                })
        },
        isDone(context, { todo }) {
            const todoToSave = JSON.parse(JSON.stringify(todo))
            todoToSave.isDone = !todoToSave.isDone

            return todoService.save(todoToSave)
                .then((todoToSave) => {
                    context.commit({ type: "isDone", todoId: todoToSave._id })
                    return todoToSave
                })
        },
        saveTodo(context, { todo }) {
            return todoService.save(todo)
                .then((todo) => {
                    context.commit({ type: "saveTodo", todo })
                    return todo._id
                })
                .catch((err) => {
                    console.log('Cannot save now')
                    throw err
                })
        },
    }
}


