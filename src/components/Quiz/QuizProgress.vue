<template>
  <v-progress-linear
    color="primary"
    :model-value="preparedQuestionIndex"
    :max="questionsLength"
  ></v-progress-linear>
</template>

<script>
import { mapState } from 'pinia'
import { useQuizStore } from '@/store'

export default {
  computed: {
    ...mapState(useQuizStore, [
      'questionsLength',
      'questionIndex',
      'showFinishTestModal',
    ]),
    preparedQuestionIndex() {
      return this.showFinishTestModal
        ? this.questionsLength
        : this.questionIndex
    },
  },
}
</script>

<style></style>
