<template>
  <div>
    <v-list density="compact" @click:select="handleSelect">
      <v-list-item
        v-for="(item, i) in variants"
        :key="i"
        :value="item"
        color="primary"
        class="quiz-list-item"
      >
        <div class="quiz-letter">{{ letters[i] }}</div>
        <div class="quiz-text">{{ item.text }}</div>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { useQuizStore } from '@/store'
import { mapState } from 'pinia'

export default {
  props: {
    answer: {
      type: {},
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      letters: ['A', 'B', 'C', 'D', 'E', 'F'],
    }
  },
  computed: {
    ...mapState(useQuizStore, ['questionIndex']),
    variants() {
      return this.quizStore.currentQuestion.variants
    },
  },
  watch: {
    questionIndex() {
      this.$forceUpdate()
    },
  },
  methods: {
    handleSelect(item) {
      if (!item.value) this.$emit('update:answer', {})
      else this.$emit('update:answer', item.id)
    },
  },
  setup() {
    const quizStore = useQuizStore()
    return { quizStore }
  },
}
</script>

<style lang="scss" scoped>
.quiz-list-item::v-deep {
  font-size: 16px;
  .v-list-item__content {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 20px;
    overflow: visible;
  }
}

.quiz-letter {
  width: 26px;
  height: 26px;
  line-height: 2px;
  background-color: #d7a4f7;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
