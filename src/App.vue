<template>
  <v-app>
    <SnowParticles />
    <v-main>
      <router-view />
    </v-main>
    <!-- <Footer /> -->
  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue'
import SnowParticles from '@/components/particles/SnowParticles.vue'

export default {
  components: { Footer, SnowParticles },
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

// bgc - #806491

.v-application {
  // background-color: #656382;
  // background-color: #675fd4;
  background-color: #806491;
}
// .v-main {
//   display: flex;
//   flex-direction: column;

//   .main-container {
//     flex: 1 1 auto;
//   }
// }
</style>
