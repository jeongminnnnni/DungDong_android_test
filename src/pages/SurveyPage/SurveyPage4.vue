<template>
  <v-container>
    <v-row no-gutters justify="start">
      <v-label>기숙사</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        :items="hourItem"
        placeholder=""
        v-model="wakeUpHour"
        variant="outlined"
      ></v-select>
      <v-select
        :items="minItem"
        placeholder=""
        v-model="wakeUpMin"
        variant="outlined"
      ></v-select>
    </v-row>

    <v-row no-gutters justify="start">
      <v-label>기숙사</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        :items="hourItem"
        placeholder=""
        v-model="lightOffHour"
        variant="outlined"
      ></v-select>
      <v-select
        :items="minItem"
        placeholder=""
        v-model="lightOffMin"
        variant="outlined"
      ></v-select>
    </v-row>

    <v-row no-gutters justify="start">
      <v-label>기숙사</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        :items="hourItem"
        placeholder=""
        v-model="bedTimeHour"
        variant="outlined"
      ></v-select>
      <v-select
        :items="minItem"
        placeholder=""
        v-model="bedTimeMin"
        variant="outlined"
      ></v-select>
    </v-row>

    <v-row no-gutters justify="start">
      <v-label>기숙사</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        :items="sleepHabitItem"
        placeholder=""
        v-model="sleepHabit"
        variant="outlined"
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

const wakeUpHour = ref(null);
const wakeUpMin = ref(null);

const lightOffHour = ref(null);
const lightOffMin = ref(null);

const bedTimeHour = ref(null);
const bedTimeMin = ref(null);

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

const sleepHabit = ref(null);
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
    wakeUp.value = survey.wakeUp || null;
    lightOff.value = survey.lightOff || null;
    bedTime.value = survey.bedTime || null;
    sleepHabit.value = survey.sleepHabit || null;
  }
}

// 변경값 로컬스토리지에 저장
function updateLocalStorage(field, value) {
  const existingSurvey = JSON.parse(localStorage.getItem("userSurvey")) || {};
  existingSurvey[field] = value;
  localStorage.setItem("userSurvey", JSON.stringify(existingSurvey));
  console.log(`Updated localStorage userSurvey: ${field} = ${value}`);
}

// ----- 함수 정의 ----- //


</script>

<style scoped>
</style>