<template>
  <v-progress-linear
    :model-value="questionIndex"
    color="primary"
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
