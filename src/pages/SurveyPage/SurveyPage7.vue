<template>
  <BoxContainer>
    <SubTitle :title="title" :desc="desc"> </SubTitle>

    <v-row no-gutters justify="start">
      <v-label>이중 해당하는 것이 있다면 선택해주세요 (최대5개)</v-label>
    </v-row>
    <v-row no-gutters justify="start">
      <v-col>
        <v-chip
          v-for="(tag, index) in tagItem"
          :key="index"
          :class="{'v-chip--selected': selectTag.includes(tag.value)}"
          class="custom-chip"
          :color="selectTag.includes(tag.value) ? '#FF5858' : '#B1B1B1'"
          variant="outlined"
          @click="handleClickTag(tag.value)"
        >
          {{ tag.title }}
        </v-chip>
      </v-col>
    </v-row>

    <v-row no-gutters justify="start">
      <v-label>더 하고 싶은 말이 있다면 작성해주세요</v-label>
    </v-row>
    <v-row no-gutters justify="center">
      <v-text-field
        variant="outlined" rounded="lg" bg-color="#FFFFFF" base-color="#CCCCCC" color="#CCCCCC" item-color="#CCCCCC" 
        :items="dormItem"
        placeholder="위에 선택한 태그 부가 설명 등"
        v-model="dorm"
        maxlength="100"
      ></v-text-field>
    </v-row>
    
  </BoxContainer>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"
import BoxContainer from "@/components/BoxContainer.vue";

const title = '기타참고사항'
const desc = '앞서 작성한 것 외에 더 하고 싶은 말이 있다면<br>이 페이지에서 자유롭게 말해주세요.'

const selectTag = ref([])
const tagItem = ref([
  { title: '매트선호', value: 0},
  { title: '고요를 즐김', value: 1},
  { title: '배달음식러버', value: 2},
  { title: '룸메와 거리두기 필요', value: 3},
  { title: '길고 잦은 전화통화', value: 4},
  { title: '특이습관', value: 5},
  { title: '추위 많이 탐', value: 6},
  { title: '더위 많이 탐', value: 7},
  { title: '알러지', value: 8},
  { title: '짐이 많음', value: 9},
  { title: '잦은 밤샘', value: 10},
  { title: '잠귀 밝음', value: 11},
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
.custom-chip{
  background-color: #FFFFFF;
}

:deep(.v-label) {
  color: #000000;
  font-style: normal;
  font-weight: 600;
}
</style>