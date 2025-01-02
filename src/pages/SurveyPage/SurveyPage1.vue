<template>
  <v-container>
    <v-row no-gutters justify="start">
      <v-label>기숙사</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        :items="dormItem"
        placeholder="기숙사를 선택해주세요"
        v-model="dorm"
        variant="outlined"
      ></v-select>
    </v-row>
    <v-row no-gutters justify="start">
      <v-label>기숙사</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        :items="birthItem"
        v-model="birth"
        variant="outlined"
      ></v-select>
    </v-row>
    <v-row no-gutters justify="start">
      <v-label>기숙사</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        :items="studentIdItem"
        v-model="studentId"
        variant="outlined"
      ></v-select>
    </v-row>
    <v-row no-gutters justify="start">
      <v-label>기숙사</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-select
        :items="collegeItem"
        v-model="college"
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


const dorm = ref(0);          // 기숙사
const birth = ref("");      // 생년월일 8자리 (문자열 권장)
const studentId = ref("");     // 학번 8자리 (문자열 권장)
const college = ref("");     // 단과대 (문자열)
const mbti = ref("");         // MBTI (문자열)



const dormItem = ref([
  { title: '예지 1동', value: 0},
  { title: '예지 2동', value: 1},
  { title: '예지 3동', value: 2},
  { title: '명덕 1동', value: 10},
  { title: '명덕 2동', value: 11},
  { title: '명덕 3동', value: 12},
  // { title: '글로벌 하우스', value: 20},
  // { title: '308 블루미르홀', value: 21},
  // { title: '309 블루미르홀', value: 22},
  // { title: '퓨처하우스', value: 23}
])

const birthItem = ref(
  Array.from({ length: 21 }, (_, index) => {
    const year = 1990 + index;
    return { title: `${year}`, value: year };
  })
);

const studentIdItem = ref(
  Array.from({ length: 16 }, (_, index) => {
    const year = 10 + index;
    return { title: `${year}`, value: year };
  })
);

const collegeItem = ref([
  { title: '비공개', value: 0},
  { title: '예술', value: 1},
  { title: '체육', value: 2},
  { title: '예공', value: 3},
  { title: '생공', value: 4},
  { title: '공과', value: 5},
])

// ----- 라이프 사이클 ----- //
onMounted(() => {
  const existingSurvey = localStorage.getItem('survey1');
  if (existingSurvey) {
    const parsedSurvey = JSON.parse(existingSurvey);
    dorm.value = parsedSurvey.dorm || 0;
    birth.value = parsedSurvey.birth || '';
    studentId.value = parsedSurvey.studentId || '';
    college.value = parsedSurvey.college || '';
    mbti.value = parsedSurvey.mbti || '';
  }
});

onUnmounted(() => {

})


watch(dorm, (newValue, oldValue) => {
  console.log(`Dorm changed from ${oldValue} to ${newValue}`);
});

watch(birth, (newValue, oldValue) => {
  console.log(`Birth year changed from ${oldValue} to ${newValue}`);
});

watch(studentId, (newValue, oldValue) => {
  console.log(`Student ID changed from ${oldValue} to ${newValue}`);
});

watch(college, (newValue, oldValue) => {
  console.log(`College changed from ${oldValue} to ${newValue}`);
});

// ----- 함수 정의 ----- //


</script>

<style scoped>
</style>