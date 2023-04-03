import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/authorization/Login.vue'
import YourName from '../components/authorization/YourName.vue'
import CreateAccount from '../components/authorization/CreateAccount.vue'
import LeftBar from '../components/LeftBar.vue'

// import CreateAccount2 from '../components/authorization/CreateAccount2.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/your-name/:size',
    name: 'Name',
    component: YourName
  },
  {
    path: '/create-account/:size',
    name: 'Create',
    component: CreateAccount
  },
  {
    path: '/todos/:name',
    name: 'Todos',
    component: LeftBar
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
