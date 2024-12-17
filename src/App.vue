<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <!-- <Footer /> -->
  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  components: { Footer },
}
</script>

<style lang="scss" scoped>
.centered-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 500px;
  width: 100%;
}

.v-application {
  // background-color: #656382;
  background-color: #675fd4;
}
// .v-main {
//   display: flex;
//   flex-direction: column;

//   .main-container {
//     flex: 1 1 auto;
//   }
// }
</style>
