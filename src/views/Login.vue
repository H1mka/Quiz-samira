<template>
  <v-container class="centered-container">
    <v-card width="500">
      <v-card-title>Введите имя пользователя</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="userName"
          label="Имя пользователя"
          variant="outlined"
          dense
          hide-details
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="flat" @click="cancel">Выйти вон</v-btn>
        <v-btn color="primary" variant="flat" @click="login">Войти</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { useToast } from 'vue-toastification'
const required_user = 'miraholmes13'

export default {
  data: () => ({
    userName: '',
    toast: useToast(),
  }),
  methods: {
    login() {
      if (this.userName === required_user) {
        this.$router.push({ name: 'Quiz' })
      } else {
        this.userName = ''
        this.toast.error('Ошибка, СаМира, ошибка')
      }
    },
    cancel() {
      this.toast.error('Выход только один - пройти квиз')
    },
  },
}
</script>

<style></style>
