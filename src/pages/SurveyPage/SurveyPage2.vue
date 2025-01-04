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

const title = 'MBTI'

const mbti0 = ref(0);
const mbti1 = ref(0);
const mbti2 = ref(0);
const mbti3 = ref(0);

// ----- 라이프 사이클 ----- //
onMounted(() => {
  setCurrentSurvey()
});

onUnmounted(() => {

})

// 변경값 확인 및 업데이트
watch(mbti0, (newValue, oldValue) => {
  console.log(`--- mbti0 changed from ${oldValue} to ${newValue}`);
  updateLocalStorage("mbti0", newValue);
});

watch(mbti1, (newValue, oldValue) => {
  console.log(`--- mbti1 changed from ${oldValue} to ${newValue}`);
  updateLocalStorage("mbti1", newValue);
});

watch(mbti2, (newValue, oldValue) => {
  console.log(`--- mbti2 changed from ${oldValue} to ${newValue}`);
  updateLocalStorage("mbti2", newValue);
});

watch(mbti3, (newValue, oldValue) => {
  console.log(`--- mbti3 changed from ${oldValue} to ${newValue}`);
  updateLocalStorage("mbti3", newValue);
});

// ----- 함수 정의 ----- //

// 최초 로딩
function setCurrentSurvey() {
  localStorage.setItem('userProgress', JSON.stringify({ currentStep: 2}));
  console.log("Updated localStorage userProgress:", localStorage.getItem('userProgress'))

  // 저장된 값이 있다면 가져오기
  const existingSurvey = localStorage.getItem('userSurvey');
  
  if (existingSurvey) {
    const survey = JSON.parse(existingSurvey);
    mbti0.value = survey.mbti[0] || 0;
    mbti1.value = survey.mbti[1] || 0;
    mbti2.value = survey.mbti[2] || 0;
    mbti3.value = survey.mbti[3] || 0;
  }
}

// 변경값 로컬스토리지에 저장
function updateLocalStorage(field, value) {
  const existingSurvey = JSON.parse(localStorage.getItem("userSurvey")) || {};
  existingSurvey[field] = value;
  localStorage.setItem("userSurvey", JSON.stringify(existingSurvey));
  console.log(`Updated localStorage userSurvey: ${field} = ${value}`);
}



</script>

<style scoped>
</style>