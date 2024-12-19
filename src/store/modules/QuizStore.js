import { defineStore } from 'pinia'

const DEFAULT_QUESTIONS = [
  {
    id: 1,
    title: 'Тест 1',
    variants: [
      { id: 'ans-1', text: 'Вариант ответа 1' },
      { id: 'ans-2', text: 'Вариант ответа 2' },
      { id: 'ans-3', text: 'Вариант ответа 3' },
      { id: 'ans-4', text: 'Вариант ответа 4' },
    ],
    correctAnswerId: 'ans-1',
    isCorrect: false,
  },
  {
    id: 2,
    title: 'Тест 2',
    variants: [
      { id: 'ans-1', text: 'Вариант ответа 21' },
      { id: 'ans-2', text: 'Вариант ответа 22' },
      { id: 'ans-3', text: 'Вариант ответа 23' },
      { id: 'ans-4', text: 'Вариант ответа 24' },
    ],
    correctAnswerId: 'ans-2',
    isCorrect: false,
  },
  {
    id: 1,
    title: 'Тест 3',
    variants: [
      { id: 'ans-1', text: 'Вариант ответа 31' },
      { id: 'ans-2', text: 'Вариант ответа 32' },
      { id: 'ans-3', text: 'Вариант ответа 33' },
      { id: 'ans-4', text: 'Вариант ответа 34' },
    ],
    correctAnswerId: 'ans-1',
    isCorrect: false,
  },
  {
    id: 1,
    title: 'Тест 4',
    variants: [
      { id: 'ans-1', text: 'Вариант ответа 41' },
      { id: 'ans-2', text: 'Вариант ответа 42' },
      { id: 'ans-3', text: 'Вариант ответа 43' },
      { id: 'ans-4', text: 'Вариант ответа 44' },
    ],
    correctAnswerId: 'ans-1',
    isCorrect: false,
  },
]

const useQuizStore = defineStore('quizStore', {
  state: () => ({
    questions: JSON.parse(JSON.stringify(DEFAULT_QUESTIONS)),
    questionIndex: 0,
    answer: {},
  }),
  actions: {
    setCorrectAnswer(asnwerId) {
      const correct = asnwerId === this.currentQuestion.correctAnswerId
      this.currentQuestion.isCorrect = correct
    },
    checkAnswer(asnwer) {
      this.setCorrectAnswer(asnwer.id)
      this.nextQuestion()
    },
    nextQuestion() {
      if (this.questionIndex === this.questions.length - 1) {
        console.log('End of test!')
        // router to finish page
        return
      }
      this.questionIndex += 1
      this.flushData()
    },
    backQuestion() {
      this.questionIndex -= 1
      this.flushData()
    },
    flushData() {
      this.answer = {}
    },
  },
  getters: {
    questionsLength: (state) => state.questions.length,
    currentQuestion: (state) => state.questions[state.questionIndex],
    correctAnswers: (state) =>
      state.questions.reduce((acc, item) => {
        if (item.isCorrect) acc += 1
        return acc
      }, 0),
  },
})

export default useQuizStore
