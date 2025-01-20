<template>
  <v-container>
    <v-row no-gutters justify="start">
      <v-label>방청소 주기는 어느정도가 적당하다 생각하나요?</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-slider
        :max="4" :step="1"
        v-model="clean"
        color="#FF5858" thumb-color="#FF5858" track-color="#D9D9D9" track-fill-color="#FF5858" tick-size="5" show-ticks="always" 
      ></v-slider>
    </v-row>

    <v-row no-gutters justify="start">
      <v-label>벌레 잘 잡으시나요?</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-slider
        :max="4" :step="1"
        v-model="bug"
        color="#FF5858" thumb-color="#FF5858" track-color="#D9D9D9" track-fill-color="#FF5858" tick-size="5" show-ticks="always" 
      ></v-slider>
    </v-row>

    <v-row no-gutters justify="start">
      <v-label>방 안에서 음식물 섭취, 어떻게 생각하시나요? (간식제외)</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-slider
        :max="4" :step="1"
        v-model="eatIn"
        color="#FF5858" thumb-color="#FF5858" track-color="#D9D9D9" track-fill-color="#FF5858" tick-size="5" show-ticks="always" 
      ></v-slider>
    </v-row>

  </v-container>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"

const title = '청소/청결';

const clean = ref(0);
const bug = ref(0);
const eatIn = ref(0);    


// ----- 라이프 사이클 ----- //
onMounted(() => {
  setCurrentSurvey()
});

onUnmounted(() => {

})

// 변경값 확인 및 업데이트
watch(clean, (newValue, oldValue) => {
  console.log(`--- clean changed from ${oldValue} to ${newValue}`);
  updateLocalStorage("clean", newValue);
});

watch(bug, (newValue, oldValue) => {
  console.log(`--- bug changed from ${oldValue} to ${newValue}`);
  updateLocalStorage("bug", newValue);
});

watch(eatIn, (newValue, oldValue) => {
  console.log(`--- eatIn changed from ${oldValue} to ${newValue}`);
  updateLocalStorage("eatIn", newValue);
});

// ----- 함수 정의 ----- //

// 최초 로딩
function setCurrentSurvey() {
  localStorage.setItem('userProgress', JSON.stringify({ currentStep: 5}));
  console.log("Updated localStorage userProgress:", localStorage.getItem('userProgress'))

  // 저장된 값이 있다면 가져오기
  const existingSurvey = localStorage.getItem('userSurvey');
  
  if (existingSurvey) {
    const survey = JSON.parse(existingSurvey);
    clean.value = survey.clean || 0;
    bug.value = survey.bug || 0;
    eatIn.value = survey.eatIn || 0;
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
/* 슬라이더 틱의 색상 고정 */
.v-slider__ticks {
  background-color: #ffffff !important; /* 틱을 하얀색으로 고정 */
  border-radius: 100%; /* 둥근 모양 */
}
</style>