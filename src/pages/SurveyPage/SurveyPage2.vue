<template>
  <v-container>
    <v-row justify="center">
      <v-btn-toggle
        rounded="xl"
      >
        <v-btn>I</v-btn>
        <v-btn>E</v-btn>
      </v-btn-toggle>
      <v-btn-toggle
        rounded="xl"
      >
        <v-btn>S</v-btn>
        <v-btn>N</v-btn>
      </v-btn-toggle>
      <v-btn-toggle
        rounded="xl"
      >
        <v-btn>T</v-btn>
        <v-btn>F</v-btn>
      </v-btn-toggle>
      <v-btn-toggle
        rounded="xl"
      >
        <v-btn>P</v-btn>
        <v-btn>J</v-btn>
     </v-btn-toggle>
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

function handleClickTag(value) {
  const index = selectTag.value.indexOf(value);

  // 이미 선택된 태그라면 선택을 해제하고, 아니라면 선택 추가
  if (index !== -1) {
    selectTag.value.splice(index, 1); // 선택 해제
  } else {
    selectTag.value.push(value); // 선택 추가
  }

  console.log('Selected tags:', selectTag.value);
}



</script>

<style scoped>
</style>