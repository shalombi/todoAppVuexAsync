import { utilService } from "./util.service.js"

export const userService = {
    getLoggedinUser,
    login,
    updateBalance,
    addOrder,
    changeOrderStatus,
}
const KEY = 'loggedinUser'

function getLoggedinUser() {
    var user = utilService.loadFromStorage(KEY)
    if (!user) user = login()
    return user
}

function login() {
    const user = {
        fullName: 'Babaaa',
        balance: 20,
        orders: [],
    }
    utilService.saveToStorage(KEY, user)
    return user
}

function updateBalance(amount) {
    const user = getLoggedinUser()

    user.balance += amount
    utilService.saveToStorage(KEY, user)
}

function addOrder(order) {
    const user = getLoggedinUser()

    user.orders.unshift(order)
    user.balance -= order.total
    utilService.saveToStorage(KEY, user)
}

function changeOrderStatus(orderId, status) {
    const user = getLoggedinUser()


    // user.orders.find(order => order._id === orderId).status = status

    // recommend way...
    const order = user.orders.find(order => order._id === orderId)
    order.status = status

    utilService.saveToStorage(KEY, user)
}

