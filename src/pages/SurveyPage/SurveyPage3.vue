<template>
  <v-container>
    <v-row no-gutters justify="start">
      <v-label>기숙사</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        variant="outlined" rounded="lg" bg-color="#FFFFFF" base-color="#FF5858" color="#FF5858" item-color="#FF5858"
        :items="smokeItem"
        placeholder="기숙사를 선택해주세요"
        v-model="smoke"
      ></v-select>
    </v-row>

    <v-row no-gutters justify="center">
      <v-text-field
        variant="underlined" base-color="#FF5858" color="#FF5858" item-color="#FF5858"
        class="custom-text-field"
        placeholder="0"
        v-model="dymCnt"
      ></v-text-field>

      <v-select
        variant="outlined" rounded="lg" bg-color="#FFFFFF" base-color="#FF5858" color="#FF5858" item-color="#FF5858"
        :items="dmyItem"
        v-model="dym"
      ></v-select>
      <v-label>
        에
      </v-label>

      <v-text-field
        variant="underlined" base-color="#FF5858" color="#FF5858" item-color="#FF5858"
        class="custom-text-field"
        placeholder="0"
        v-model="drinkCnt"
      ></v-text-field>
      <v-label>
        번
      </v-label>
    </v-row>

    <v-row no-gutters justify="start">
      <v-label>흡연/음주와 관련하여 하고 싶은 말이 있다면 적어주세요</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-text-field
        variant="outlined" rounded="lg" bg-color="#FFFFFF" base-color="#FF5858" color="#FF5858" item-color="#FF5858"
        placeholder="술 주사, 흡연 습관 등"
        maxlength="30"
      ></v-text-field>
    </v-row>

  </v-container>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"

const title = '흡연/음주'

const smoke = ref(null);
const smokeItem = ref([
  { title: '비흡연', value: 0},
  { title: '연초', value: 1},
  { title: '전자담배', value: 2},
]);

const drink = ref(null);
const dymCnt = ref(null);
const dym = ref(0);
const dmyItem = ref([
  { title: '주', value: 0},
  { title: '월', value: 1},
  { title: '년', value: 2},
]);
const drinkCnt = ref(null);

const sdEtc = ref(null);

// ----- 라이프 사이클 ----- //
onMounted(() => {
  setCurrentSurvey()
});

onUnmounted(() => {

})

// 변경값 확인 및 업데이트
watch(smoke, (newValue, oldValue) => {
  console.log(`--- smoke changed from ${oldValue} to ${newValue}`);
  updateLocalStorage("smoke", newValue);
});

// ----- 함수 정의 ----- //

// 최초 로딩
function setCurrentSurvey() {
  localStorage.setItem('userProgress', JSON.stringify({ currentStep: 3}));
  console.log("Updated localStorage userProgress:", localStorage.getItem('userProgress'))

  // 저장된 값이 있다면 가져오기
  const existingSurvey = localStorage.getItem('userSurvey');
  
  if (existingSurvey) {
    const survey = JSON.parse(existingSurvey);
    smoke.value = survey.smoke || null;
    drink.value = survey.drink || null;
    sdEtc.value = survey.sdEtc || null;
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
/* 토글 버튼 아이콘 색상 */
:deep(.v-input__control .v-icon) {
  color: #FF5858 !important; /* 아이콘 색상 */
}

</style>