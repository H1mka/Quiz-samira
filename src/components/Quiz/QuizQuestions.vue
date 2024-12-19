<template>
  <v-card ref="quizCard" width="500">
    <QuizProgress />
    <v-img height="280" :src="currentQuestion.imageSrc"></v-img>
    <v-card-title class="d-flex justify-center">
      <h2>{{ quizStore.currentQuestion.title }}</h2>
    </v-card-title>
    <v-card-text>
      <QuizQuestionsList v-model:answer="answer" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        variant="flat"
        :class="{ 'mr-18': isSneakyAnswer }"
        :disabled="isBackButtonDisabled"
        @click="handleBack"
      >
        Back
      </v-btn>
      <v-btn
        ref="nextButton"
        color="primary"
        variant="flat"
        :class="{ 'sneaky-button': isSneakyAnswer }"
        :style="isSneakyAnswer ? nextBtnStyles : {}"
        :disabled="isNextButtonDisabled"
        @click="handleNext"
        @mouseenter="handleNextMouseEnter"
      >
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useQuizStore } from '@/store'
import { mapState, mapWritableState } from 'pinia'
import QuizQuestionsList from '@/components/Quiz/QuizQuestionsList.vue'
import QuizProgress from '@/components/Quiz/QuizProgress.vue'
import FinishTestModal from '@/components/Quiz/modals/FinishTestModal.vue'

const DEFAULT_NEXT_BTN_STYLES = {
  right: 0,
}

export default {
  components: { QuizQuestionsList, QuizProgress, FinishTestModal },
  data() {
    return {
      nextBtnStyles: { ...DEFAULT_NEXT_BTN_STYLES },
    }
  },
  computed: {
    ...mapState(useQuizStore, [
      'questionsLength',
      'questionIndex',
      'currentQuestion',
    ]),
    ...mapWritableState(useQuizStore, ['answer']),
    isNextButtonDisabled() {
      return !Object.values(this.answer).length
    },
    isBackButtonDisabled() {
      return this.questionIndex === 0
    },
    isSneakyAnswer() {
      return this.currentQuestion.sneakyAnswer
    },
    isCorrectAnswer() {
      return this.currentQuestion.correctAnswerId === this.answer.id
    },
  },
  methods: {
    handleNext() {
      if (!this.answer) return
      this.quizStore.checkAnswer(this.answer)
    },
    handleBack() {
      this.quizStore.backQuestion()
      this.nextBtnStyles = { ...DEFAULT_NEXT_BTN_STYLES }
    },
    async handleNextMouseEnter() {
      console.log('handleNextMouseEnter', this.answer)
      await this.$nextTick()
      console.log('test', this.isNextButtonDisabled)
      if (!this.isSneakyAnswer || this.isCorrectAnswer) return

      const offset = 10
      const { width: cardWidth, height: cardHeight } =
        this.$refs.quizCard.$el.getBoundingClientRect()
      const { width: btnWidth, height: btnHeight } =
        this.$refs.nextButton.$el.getBoundingClientRect()

      const newX = this.getRandomNumber(0, cardWidth - btnWidth)
      const newY = this.getRandomNumber(0, cardHeight - btnHeight + offset)

      this.nextBtnStyles = {
        top: newY + 'px',
        right: newX + 'px',
      }
    },
    getRandomNumber(min, max) {
      return Math.random() * (max - min) + min
    },
  },
  setup() {
    const quizStore = useQuizStore()
    return { quizStore }
  },
}
</script>

<style lang="scss" scoped>
.sneaky-button {
  position: absolute;
  right: 0;
  margin-right: 8px;
}

.mr-18 {
  margin-right: 72px;
}
</style>
