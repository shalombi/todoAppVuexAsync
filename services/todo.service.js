// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex


import { utilService } from './util.service.js'

const KEY = 'todosDB'

export const todoService = {
    query,
    getById,
    remove,
    save,
    getEmptyTodo,
}


var gTodos = _createTodos()

// TODO: support paging and filtering and sorting
function query() {
    const todos = JSON.parse(JSON.stringify(gTodos))
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(todos) }, 0)
    })
}

function getById(id) {
    const todo = gTodos.find(todo => todo._id === id)
    return Promise.resolve(todo)
}

function remove(id) {
    
    const idx = gTodos.findIndex(todo => todo._id === id)
    gTodos.splice(idx, 1)
    utilService.saveToStorage(KEY, gTodos)
    return Promise.resolve()
}

function save(todo) {
    // return Promise.reject('err...')
    const todoToSave = JSON.parse(JSON.stringify(todo))
    const savedTodo = (todoToSave._id) ? _update(todoToSave) : _add(todoToSave)
    utilService.saveToStorage(KEY, gTodos)
    return Promise.resolve(savedTodo)
}


function _add(todo) {
    todo._id = utilService.makeId()
    gTodos.push(todo)
    return todo
}

function _update(todo) {
    const idx = gTodos.findIndex(currTodo => currTodo._id === todo._id)
    gTodos.splice(idx, 1, todo)
    return todo
}

function getEmptyTodo() {
    return {
        _id: '',
        txt: '',
        isDone: false
    }
}

function _createTodos() {
    var todos = utilService.loadFromStorage(KEY)
    if (!todos || !todos.length) {
        todos = [_createTodo('Make sport'), _createTodo('Enjoy'), _createTodo('Sleep good')]
        utilService.saveToStorage(KEY, todos)
    }
    return todos
}

function _createTodo(txt) {
    return {
        _id: utilService.makeId(),
        txt,
        isDone: false
    }
}