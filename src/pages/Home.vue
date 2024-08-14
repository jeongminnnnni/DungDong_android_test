<template>
  <v-container>
    <v-row class="align-center">
      <v-img 
      src="@/assets/logo.svg"
      :width="230" :height="100"
      min-width="230px" min-height="100px" 
      ></v-img>
    </v-row>

  </v-container>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"


// ----- 라이프 사이클 ----- //
onMounted(() => {

});

onUnmounted(() => {

})

// ----- 함수 정의 ----- //




</script>

<style scoped>
</style>