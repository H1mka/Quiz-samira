<template>
  <v-container class="centered-container">
    <v-card width="500">
      <v-card-title class="d-flex justify-center">
        <h2>{{ quizStore.currentQuestion.title }}</h2>
      </v-card-title>
      <v-card-text>
        <QuizQuestions v-model:answer="answer" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          variant="flat"
          :disabled="isNextButtonDisabled"
          @click="handleNext"
          >Next</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { useQuizStore } from '@/store'
import { mapWritableState } from 'pinia'
import QuizQuestions from '@/components/Quiz/QuizQuestions.vue'

export default {
  components: { QuizQuestions },
  data() {
    return {}
  },
  computed: {
    ...mapWritableState(useQuizStore, ['answer']),
    isNextButtonDisabled() {
      return !Object.values(this.answer).length
    },
  },
  methods: {
    handleNext() {
      if (!this.answer) return
      this.quizStore.checkAnswer(this.answer)
    },
  },
  setup() {
    const quizStore = useQuizStore()
    return { quizStore }
  },
}
</script>

<style></style>
