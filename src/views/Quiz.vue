<template>
  <v-container class="centered-container">
    <QuizQuestions />
    <FinishTestModal />
  </v-container>
</template>

<script>
import FinishTestModal from '@/components/Quiz/modals/FinishTestModal.vue'
import QuizQuestions from '@/components/Quiz/QuizQuestions.vue'

export default {
  components: { FinishTestModal, QuizQuestions },
  data() {},
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped></style>
