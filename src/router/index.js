import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Quiz from '@/views/Quiz.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
