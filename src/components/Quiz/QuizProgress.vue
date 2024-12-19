<template>
  <v-progress-linear
    color="primary"
    height="5"
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
