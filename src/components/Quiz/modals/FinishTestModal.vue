<template>
  <v-dialog v-model="showModal" max-width="600" persistent>
    <v-card>
      <v-card-title>Поздравляю с прохождением теста!</v-card-title>
      <Transition>
        <v-card-text class="d-flex justify-center" v-if="step === 'gift'">
          <v-img
            :width="260"
            aspect-ratio="16/9"
            cover
            src="/src/assets/red-gift.png"
            class="gift-image"
            @click="step = 'info'"
          ></v-img>
        </v-card-text>
      </Transition>
      <Transition>
        <v-card-text v-if="step === 'info'">
          <div class="text-h5">Info</div>
        </v-card-text>
      </Transition>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      step: 'gift',
    }
  },
  computed: {
    showModal: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.gift-image {
  flex: unset;
  cursor: pointer;
  animation: shake 2s ease-in-out infinite;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@keyframes shake {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(3deg);
  }
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
