<template>
  <v-container class="centered-container">
    <v-card width="600">
      <v-card-title class="d-flex justify-center">
        <h2>Результат теста {{ correctAnswersNumber }} / {{ questionsLength }}</h2>
      </v-card-title>

      <v-card-subtitle class="d-flex justify-center">{{ finishText }}</v-card-subtitle>

      <v-card-text v-if="isPassedTest">
        <div class="text-body-1">Как бы вы оценили тест?</div>
        <v-slider
          v-model="ratingValue"
          color="primary"
          show-ticks="always"
          step="1"
          tick-size="5"
          :max="4"
          :ticks="tickLabels"
        ></v-slider>
        <div class="rating-preview" :style="ratingPreviewStyle">
          <v-img
            width="100%"
            aspect-ratio="16/9"
            cover
            src="https://cs5.pikabu.ru/post_img/big/2014/08/30/9/1409406660_1148277290.jpg"
          ></v-img>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <template v-if="isPassedTest">
          <v-btn color="success" variant="flat" @click="handleShowGift">Підаруночек</v-btn>
        </template>
        <template v-else>
          <v-btn variant="flat" color="primary" @click="handleRetryTest">Пройти заново</v-btn>
        </template>
      </v-card-actions>
    </v-card>

    <GiftModal v-model="showGiftTable" />
  </v-container>
</template>

<script>
import GiftModal from '@/components/Quiz/modals/GiftModal.vue'
import { useQuizStore } from '@/store'
import { mapState } from 'pinia'
import { options } from '@/helper/options'

export default {
  components: { GiftModal },
  data: () => ({
    pointsNeeded: options?.pointsNeeded || 5,
    ratingValue: 4,
    showGiftTable: false,
    tickLabels: {
      0: 'Треш',
      1: 'Лучше сделала бы',
      2: 'Норм',
      3: 'Гуд',
      4: 'Потужно',
    },
  }),
  computed: {
    ...mapState(useQuizStore, ['correctAnswersNumber', 'questionsLength']),
    isPassedTest() {
      return this.correctAnswersNumber >= options?.pointsNeeded
    },
    finishText() {
      return this.isPassedTest
        ? 'Тест успешно пройден!'
        : 'К сожалению тест не пройден, попробуй ещё раз'
    },
    ratingPreviewStyle() {
      const brightnessMap = {
        0: 'brightness(1)',
        1: 'brightness(0.5)',
        2: 'brightness(0.2)',
        3: 'brightness(0.1)',
        4: 'brightness(0)',
      }
      const brightness = brightnessMap[this.ratingValue]

      return { filter: brightness }
    },
  },
  methods: {
    handleRetryTest() {
      const quizStore = useQuizStore()
      quizStore.$reset()
      this.$router.push({ name: 'Login' })
    },
    handleShowGift() {
      this.showGiftTable = true
    },
  },
}
</script>

<style lang="scss" scoped>
.rating-preview {
  transition: all 0.3s ease-in;
}
</style>
