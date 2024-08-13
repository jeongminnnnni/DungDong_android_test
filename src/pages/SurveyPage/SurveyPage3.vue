<template>
  <v-container>
    <v-row justify="center">
      <v-btn-toggle
        divided
      >
        <v-btn prepend-icon="mdi-plus">비흡연자</v-btn>
        <v-btn prepend-icon="mdi-plus">전자담배</v-btn>
        <v-btn prepend-icon="mdi-plus">연초</v-btn>
     </v-btn-toggle>
    </v-row>

    <v-row>
      <v-text-field
        variant="outlined"
      >
      </v-text-field>
      <v-select
        label="년월"
        :items="['년', '개월', '주']"
        variant="outlined"
      >
      </v-select>
      <v-label>
        에
      </v-label>
      <v-text-field
        variant="outlined"
      >
      </v-text-field>
      <v-label>
        번
      </v-label>
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