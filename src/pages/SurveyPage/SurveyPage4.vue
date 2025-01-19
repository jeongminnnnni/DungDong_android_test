<template>
  <v-container>
    <v-row no-gutters justify="start">
      <v-label>기상시간을 입력해주세요</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        variant="outlined" bg-color="#FFFFFF" base-color="#FF5858" color="#FF5858" item-color="#FF5858" 
        :items="hourItem"
        placeholder=""
        v-model="wakeUpHour"
      ></v-select>
      <v-label>시</v-label>
      <v-select
        variant="outlined" bg-color="#FFFFFF" base-color="#FF5858" color="#FF5858" item-color="#FF5858" 
        :items="minItem"
        placeholder=""
        v-model="wakeUpMin"
      ></v-select>
      <v-label>분</v-label>
    </v-row>

    <v-row no-gutters justify="start">
      <v-label>소등시간을 입력해주세요</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        variant="outlined" bg-color="#FFFFFF" base-color="#FF5858" color="#FF5858" item-color="#FF5858" 
        :items="hourItem"
        placeholder=""
        v-model="lightOffHour"
      ></v-select>
      <v-label>시</v-label>
      <v-select
        variant="outlined" bg-color="#FFFFFF" base-color="#FF5858" color="#FF5858" item-color="#FF5858" 
        :items="minItem"
        placeholder=""
        v-model="lightOffMin"
      ></v-select>
      <v-label>분</v-label>
    </v-row>

    <v-row no-gutters justify="start">
      <v-label>취침시간을 입력해주세요</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        variant="outlined" bg-color="#FFFFFF" base-color="#FF5858" color="#FF5858" item-color="#FF5858" 
        :items="hourItem"
        placeholder=""
        v-model="bedTimeHour"
      ></v-select>
      <v-label>시</v-label>
      <v-select
        variant="outlined" bg-color="#FFFFFF" base-color="#FF5858" color="#FF5858" item-color="#FF5858" 
        :items="minItem"
        placeholder=""
        v-model="bedTimeMin"
      ></v-select>
      <v-label>분</v-label>
    </v-row>

    <v-row no-gutters justify="start">
      <v-label>잠버릇이 있다면 선택해주세요</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        variant="outlined" bg-color="#FFFFFF" base-color="#FF5858" color="#FF5858" item-color="#FF5858" 
        :items="sleepHabitItem"
        v-model="sleepHabit"
      ></v-select>
    </v-row>

  </v-container>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"

const title = '수면시간'

const wakeUp = ref(null);
const wakeUpHour = ref('00');
const wakeUpMin = ref('00');

const lightOff = ref(null);
const lightOffHour = ref('00');
const lightOffMin = ref('00');

const bedTime = ref(null);
const bedTimeHour = ref('00');
const bedTimeMin = ref('00');

// 01시부터 24시까지 (title: 01, value: '01' 형태)
const hourItem = ref(
  Array.from({ length: 24 }, (_, index) => {
    const hour = (index + 1).toString().padStart(2, "0"); // 01, 02, ..., 24
    return { title: hour, value: hour };
  })
);

// 00분부터 10분 단위로 60분까지 (title: 00, value: '00' 형태)
const minItem = ref(
  Array.from({ length: 6 }, (_, index) => {
    const minute = (index * 10).toString().padStart(2, "0"); // 00, 10, 20, ..., 50
    return { title: minute, value: minute };
  })
);

const sleepHabit = ref(0);
const sleepHabitItem = ref([
  { title: '없음', value: 0},
  { title: '잠꼬대', value: 1},
  { title: '코골이', value: 2},
  { title: '이갈이', value: 3},
]);


// ----- 라이프 사이클 ----- //
onMounted(() => {
  setCurrentSurvey()
});

onUnmounted(() => {

})

// 변경값 확인 및 업데이트
watch(
  [wakeUpHour, wakeUpMin],
  ([newHour, newMin], [oldHour, oldMin]) => {
    console.log(`--- wakeUpHour changed from ${oldHour} to ${newHour}`);
    console.log(`--- wakeUpMin changed from ${oldMin} to ${newMin}`);
    let wakeup = `${newHour}-${newMin}`
    updateLocalStorage('wakeUp', wakeup)
  }
);

watch(
  [lightOffHour, lightOffMin],
  ([newHour, newMin], [oldHour, oldMin]) => {
    console.log(`--- lightOffHour changed from ${oldHour} to ${newHour}`);
    console.log(`--- lightOffMin changed from ${oldMin} to ${newMin}`);
    let lightOff = `${newHour}-${newMin}`
    updateLocalStorage('lightOff', lightOff)
  }
);

watch(
  [bedTimeHour, bedTimeMin],
  ([newHour, newMin], [oldHour, oldMin]) => {
    console.log(`--- bedTimeHour changed from ${oldHour} to ${newHour}`);
    console.log(`--- bedTimeMin changed from ${oldMin} to ${newMin}`);
    let bedTime = `${newHour}-${newMin}`
    updateLocalStorage('bedTime', bedTime)
  }
);

watch(sleepHabit, (newValue, oldValue) => {
  console.log(`--- sleepHabit changed from ${oldValue} to ${newValue}`);
});

// ----- 함수 정의 ----- //

// 최초 로딩
function setCurrentSurvey() {
  localStorage.setItem('userProgress', JSON.stringify({ currentStep: 4}));
  console.log("Updated localStorage userProgress:", localStorage.getItem('userProgress'))

  // 저장된 값이 있다면 가져오기
  const existingSurvey = localStorage.getItem('userSurvey');
  
  if (existingSurvey) {
    const survey = JSON.parse(existingSurvey);

    wakeUp.value = survey.wakeUp || '00-00';
    [wakeUpHour.value, wakeUpMin.value] = parseTimeValues(wakeUp);

    lightOff.value = survey.lightOff || '00-00';
    [lightOffHour.value, lightOffMin.value] = parseTimeValues(lightOff);

    bedTime.value = survey.bedTime || '00-00';
    [bedTimeHour.value, bedTimeMin.value] = parseTimeValues(bedTime);

    sleepHabit.value = survey.sleepHabit || 0;
  }
}

// 변경값 로컬스토리지에 저장
function updateLocalStorage(field, value) {
  const existingSurvey = JSON.parse(localStorage.getItem("userSurvey")) || {};
  existingSurvey[field] = value;
  localStorage.setItem("userSurvey", JSON.stringify(existingSurvey));
  console.log(`Updated localStorage userSurvey: ${field} = ${value}`);
}

function parseTimeValues(item) {
  const [hour, min] = item.value.split('-');
  let itemHour = hour || '00';
  let itemMin = min || '00';
  return [itemHour, itemMin];
};

// ----- 함수 정의 ----- //


</script>

<style scoped>
/* 토글 버튼 아이콘 색상 */
:deep(.v-input__control .v-icon) {
  color: #FF5858 !important; /* 아이콘 색상 */
}

</style>