<template>
  <v-container>


  </v-container>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"

const title = '일상생활';

const noise = ref(0);    
const share = ref(0);         
const home = ref(0);

// ----- 라이프 사이클 ----- //
onMounted(() => {
  setCurrentSurvey()
});

onUnmounted(() => {

})

// 변경값 확인 및 업데이트
watch(dorm, (newValue, oldValue) => {
  console.log(`--- Dorm changed from ${oldValue} to ${newValue}`);
  updateLocalStorage("dorm", newValue);
});

// ----- 함수 정의 ----- //

// 최초 로딩
function setCurrentSurvey() {
  localStorage.setItem('userProgress', JSON.stringify({ currentStep: 6}));
  console.log("Updated localStorage userProgress:", localStorage.getItem('userProgress'))

  // 저장된 값이 있다면 가져오기
  const existingSurvey = localStorage.getItem('userSurvey');
  
  if (existingSurvey) {
    const survey = JSON.parse(existingSurvey);
    noise.value = survey.noise || 0;
    share.value = survey.share || 0;
    home.value = survey.home || 0;
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