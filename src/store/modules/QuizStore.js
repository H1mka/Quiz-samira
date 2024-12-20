import { defineStore } from 'pinia'
import router from '@/router'
import { useToast } from 'vue-toastification'

const DEFAULT_QUESTIONS = [
  {
    id: 1,
    title: 'Какого числа отмечают новый год? 🤡',
    imageSrc: 'https://carivka.com.ua/images/articles/224/kuda-poekhat-na-novyj-god-nedorogo_1.jpg',
    imageCover: true,
    variants: [
      { id: 'ans-1', text: '13 июля' },
      { id: 'ans-2', text: '21 января' },
      { id: 'ans-3', text: 'erste jänner' },
      { id: 'ans-4', text: 'Без понятия' },
    ],
    correctAnswerId: 'ans-3',
    isCorrect: false,
  },
  {
    id: 2,
    title: 'Что весит больше, кг новогодних снежинок или кг чугуна?',
    imageSrc: 'https://carivka.com.ua/images/articles/224/kuda-poekhat-na-novyj-god-nedorogo_1.jpg',
    imageCover: true,
    variants: [
      { id: 'ans-1', text: 'Килограмм железа' },
      { id: 'ans-2', text: 'Килограмм чунгука' },
      { id: 'ans-3', text: 'Одинаково' },
      { id: 'ans-4', text: 'Килограмм снежинок' },
    ],
    correctAnswerId: 'ans-2',
    isCorrect: false,
  },
  {
    id: 3,
    title: 'Какой царь принял 1 января как дату Нового года в 46 г. до н.э.?',
    imageSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPLq-g8Sp0XrDA8Cvh_G2ZoalUM-iHr-mcIw7L1MnWovAabyeCYW3eWlQ_BGTe6dP4cnQ&usqp=CAU',
    imageCover: false,
    variants: [
      { id: 'ans-1', text: 'Харальд Синезубый' },
      { id: 'ans-2', text: 'Юлий Цезарь' },
      { id: 'ans-3', text: 'Эдуард Нахрюкович' },
      { id: 'ans-4', text: 'Мистер чел' },
    ],
    correctAnswerId: 'ans-2',
    isCorrect: false,
  },
  {
    id: 4,
    title: 'Майнкрафт Холмс гей?',
    imageSrc:
      'https://sun9-80.userapi.com/impf/gPcjhOl6O0MIKFNQhDQqAhmhO0VptV3CG7Dn8w/6c7ALYhQ2WA.jpg?size=533x604&quality=96&sign=a01011fba4f72322b7a1e38dd6046482&type=album',
    imageCover: false,
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
  {
    id: 5,
    title: 'Где в мире раньше наступает Новый год?',
    imageSrc: 'https://carivka.com.ua/images/articles/224/kuda-poekhat-na-novyj-god-nedorogo_1.jpg',
    imageCover: true,
    variants: [
      { id: 'ans-1', text: 'Кирибатия' },
      { id: 'ans-2', text: 'Украина' },
      { id: 'ans-3', text: 'Япония' },
      { id: 'ans-4', text: 'Новая Зеландия' },
    ],
    correctAnswerId: 'ans-1',
    isCorrect: false,
  },
  {
    id: 6,
    title: 'Как зовут любимого оленя Санты?',
    imageSrc:
      'https://oir.mobi/uploads/posts/2021-05/1619983827_8-oir_mobi-p-smeshnoi-olen-zhivotnie-krasivo-foto-8.jpg',
    imageCover: true,
    variants: [
      { id: 'ans-1', text: 'Серёжа' },
      { id: 'ans-2', text: 'Адольф' },
      { id: 'ans-3', text: 'Рудольф' },
      { id: 'ans-4', text: 'Арнольд' },
    ],
    correctAnswerId: 'ans-3',
    isCorrect: false,
  },
  {
    id: 7,
    title: 'В какой стране впервые появилась традиция украшать ёлку?',
    imageSrc: 'https://kaktus.ua/upload/iblock/46f/dizayn-novogodney-elki-2024.jpg',
    imageCover: true,
    variants: [
      { id: 'ans-1', text: 'Франция' },
      { id: 'ans-2', text: 'Германия' },
      { id: 'ans-3', text: 'Швеция' },
      { id: 'ans-4', text: 'Люксембург' },
    ],
    correctAnswerId: 'ans-2',
    isCorrect: false,
  },
  {
    id: 8,
    title: 'Что делает снеговик, если ему жарко?',
    imageSrc: 'https://i.pinimg.com/474x/e7/0a/b4/e70ab4d74888beab6d68078c06f1511a.jpg',
    imageCover: true,
    variants: [
      { id: 'ans-1', text: 'Перестаёт быть снеговиком' },
      { id: 'ans-2', text: 'Просит лёд' },
      { id: 'ans-3', text: 'Идёт в холодильник' },
      { id: 'ans-4', text: 'Грееться' },
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
    showFinishTestModal: false,
  }),
  actions: {
    setCorrectAnswer(asnwerId) {
      const toast = useToast()
      const correct = asnwerId === this.currentQuestion.correctAnswerId
      if (correct) toast.success('Верно', { timeout: 2500 })
      else toast.error('Не верно', { timeout: 2500 })
      this.currentQuestion.isCorrect = correct
    },
    checkAnswer(asnwer) {
      this.setCorrectAnswer(asnwer.id)
      this.nextQuestion()
    },
    nextQuestion() {
      if (this.questionIndex === this.questions.length - 1) {
        router.push({ name: 'QuizEvaluation' })
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
    correctAnswersNumber: (state) =>
      state.questions.reduce((acc, item) => {
        if (item.isCorrect) acc += 1
        return acc
      }, 0),
  },
})

export default useQuizStore
