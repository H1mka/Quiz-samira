<template>
  <v-progress-linear
    color="primary"
    height="5"
    :model-value="questionIndex"
    :max="questionsLength"
  ></v-progress-linear>
</template>

<script>
import { mapState } from 'pinia'
import { useQuizStore } from '@/store'

export default {
  computed: {
    ...mapState(useQuizStore, ['questionsLength', 'questionIndex']),
  },
}
</script>

<style></style>
