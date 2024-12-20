import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Quiz from '@/views/Quiz.vue'
import ThankYouPage from '@/views/ThankYouPage.vue'
import QuizEvaluation from '../views/QuizEvaluation.vue'

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
  {
    path: '/quiz-evaluation',
    name: 'QuizEvaluation',
    component: QuizEvaluation,
  },
  {
    path: '/thank-you',
    name: 'ThankYouPage',
    component: ThankYouPage,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
