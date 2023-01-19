const { createRouter, createWebHashHistory } = VueRouter

import homePage from './pages/home-page.js'
import shopApp from './pages/todo-app.js'
import userDetails from './pages/user-details.js'
import todoEditCmp from './pages/todo-edit.cmp.js'

import todoDetails from './pages/todo-details.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/todo',
        component: shopApp
    },
    {
        path: '/user',
        component: userDetails
    },
    {
        path: '/todo/:id',
        component: todoDetails
    },
    {
        path: '/todo/edit/:id?',
        component: todoEditCmp
    },
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})