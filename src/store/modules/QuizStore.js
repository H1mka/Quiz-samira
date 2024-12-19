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
    title: 'Майнкрафт Холмс гей?',
    imageSrc:
      'https://sun9-80.userapi.com/impf/gPcjhOl6O0MIKFNQhDQqAhmhO0VptV3CG7Dn8w/6c7ALYhQ2WA.jpg?size=533x604&quality=96&sign=a01011fba4f72322b7a1e38dd6046482&type=album',
    variants: [
      { id: 'ans-1', text: 'Да' },
      { id: 'ans-2', text: 'СЭР НЕТ СЭР!' },
      { id: 'ans-3', text: 'Не уверена 👉👈' },
      { id: 'ans-4', text: 'Другой ответ' },
    ],
    correctAnswerId: 'ans-2',
    isCorrect: false,
    sneakyAnswer: true,
  },
]

const useQuizStore = defineStore('quizStore', {
  state: () => ({
    questions: JSON.parse(JSON.stringify(DEFAULT_QUESTIONS)),
    questionIndex: 0,
    answer: {},
    showFinishTestModal: false,
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
        this.showFinishTestModal = true
        // router.push({ name: 'ThankYouPage' })
        // router to finish page
        return
      }
      this.flushData()
      this.questionIndex += 1
    },
    backQuestion() {
      this.flushData()
      this.questionIndex -= 1
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
