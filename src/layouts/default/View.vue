<template>
  <v-main>
    <SideBare/>
    <router-view />
    <Footer/>
  </v-main>
</template>

<script setup>
  import SideBare from "@/components/SideBare.vue";
import Footer from "@/components/Footer.vue";
</script>
