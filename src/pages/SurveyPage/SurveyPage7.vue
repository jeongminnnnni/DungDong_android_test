<template>
  <v-container>

    <v-row>
      <v-chip
        v-for="(tag, index) in tagItem"
        :key="index"
        :class="{'v-chip--selected': selectTag.includes(tag.value)}"
        :variant="selectTag.includes(tag.value) ? 'elevated' : 'tonal'"
        prepend-icon="mdi-plus"
        @click="handleClickTag(tag.value)"
      >
        {{ tag.title }}
      </v-chip>
    </v-row>

  </v-container>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"

const title = '기타참고사항'

const selectTag = ref([])
const tagItem = ref([
  { title: '매트선호', value: 0},
  { title: '예술', value: 1},
  { title: '체육', value: 2},
  { title: '예공', value: 3},
  { title: '생공', value: 4},
  { title: '공과', value: 5},
])

// ----- 라이프 사이클 ----- //
onMounted(() => {
  setCurrentSurvey()
});

onUnmounted(() => {

})

// 변경값 확인 및 업데이트
watch(selectTag, (newValue, oldValue) => {
  console.log(`--- Dorm changed from ${oldValue} to ${newValue}`);
  updateLocalStorage("selectTag", newValue);
});

// ----- 함수 정의 ----- //

// 최초 로딩
function setCurrentSurvey() {
  localStorage.setItem('userProgress', JSON.stringify({ currentStep: 7}));
  console.log("Updated localStorage userProgress:", localStorage.getItem('userProgress'))

  // 저장된 값이 있다면 가져오기
  const existingSurvey = localStorage.getItem('userSurvey');
  
  if (existingSurvey) {
    const survey = JSON.parse(existingSurvey);
    selectTag.value = survey.selectTag || [];
  }
}

// 변경값 로컬스토리지에 저장
function updateLocalStorage(field, value) {
  const existingSurvey = JSON.parse(localStorage.getItem("userSurvey")) || {};
  existingSurvey[field] = value;
  localStorage.setItem("userSurvey", JSON.stringify(existingSurvey));
  console.log(`Updated localStorage userSurvey: ${field} = ${value}`);
}

function handleClickTag(value) {
  const index = selectTag.value.indexOf(value);

  // 이미 선택된 태그라면 선택을 해제
  if (index !== -1) {
    selectTag.value.splice(index, 1); // 선택 해제
  } else {
    // 태그가 5개 미만일 때만 새로운 태그 추가
    if (selectTag.value.length < 5) {
      selectTag.value.push(value); // 선택 추가
    } else {
      console.log("tag select lmit - 5");
    }
  }
  console.log("Selected tags:", selectTag.value);
}


</script>

<style scoped>
</style>