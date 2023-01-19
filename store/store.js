import { todoModule } from './todo.store.js'

const { createStore } = Vuex

const storeOptions = {
    strict: true,

    state() {
        return {
            filterBy: null,
        }
    },
    mutations: {
        setFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
        },
    },
    getters: {},
    actions: {},

    modules: {
        todoModule
    }
}



export const store = createStore(storeOptions)