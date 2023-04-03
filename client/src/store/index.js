import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    todos: [],
    lists: [],
    selectedList: {
      title: 'All notes',
      id: Math.random()
    },
    userEmail: '',
    loggedIn: false
  },
  mutations: {
    loginSuccess(state) {
      state.loggedIn = true
    },
    logout(state) {
      state.loggedIn = false
    },
    setUser(state, email) {
      state.userEmail = email
    },
    // todo methods
    setTodos(state, todos) {
      state.todos = todos
    },
    addTodo(state, todo) {
      state.todos.push(todo)
    },
    deleteTodo(state, todoId) {
      state.todos = state.todos.filter(todo => todo._id !== todoId)
    },
    // list methods
    setSelectedList(state, list) {
      state.selectedList = list
    },
    setLists(state, lists) {
      state.lists = lists
    },
    addList(state, list) {
      state.lists.push(list)
    },
    deleteList(state, listId) {
      state.lists = state.lists.filter(list => list._id !== listId)
    }
  },
  actions: {},
  modules: {}
})

export default store