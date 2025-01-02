<template>
  <v-container>
    <v-row justify="center">
      <v-select
        label="기숙사"
        :items=dormItem
        v-model="survey.dorm"
        variant="outlined"
      ></v-select>

      <v-autocomplete
        label="생년"
        :items=birthItem
        v-model="survey.birth"
        variant="outlined"
      ></v-autocomplete>

      <v-autocomplete
        label="학번"
        :items=studentIdItem
        v-model="survey.studentId"
        variant="outlined"
      ></v-autocomplete>

      <v-autocomplete
        label="단과대"
        :items=collegeItem
        v-model="survey.college"
        variant="outlined"
      ></v-autocomplete>
    </v-row>

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

    <v-row justify="center">
      <v-btn-toggle
        divided
      >
        <v-btn prepend-icon="mdi-plus">비흡연자</v-btn>
        <v-btn prepend-icon="mdi-plus">전자담배</v-btn>
        <v-btn prepend-icon="mdi-plus">연초</v-btn>
     </v-btn-toggle>
    </v-row>

    <v-row>
      <v-text-field
        variant="outlined"
      >
      </v-text-field>
      <v-select
        label="년월"
        :items="['년', '개월', '주']"
        variant="outlined"
      >
      </v-select>
      <v-label>
        에
      </v-label>
      <v-text-field
        variant="outlined"
      >
      </v-text-field>
      <v-label>
        번
      </v-label>
    </v-row>

    <v-row>
      <v-slider
        :max="2"
        :ticks="noiseLabel"
        show-ticks="always"
        step="1"
        tick-size="4"
      ></v-slider>
    </v-row>

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

const survey = ref({
  dorm: "",           // 기숙사 (문자열)
  birth: "",          // 생년월일 8자리 (문자열 권장)
  studentId: "",      // 학번 8자리 (문자열 권장)
  college: "",        // 단과대 (문자열)
  mbti: "",           // MBTI (문자열)
})

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

const selectTag = ref([])
const tagItem = ref([
  { title: '비공개', value: 0},
  { title: '예술', value: 1},
  { title: '체육', value: 2},
  { title: '예공', value: 3},
  { title: '생공', value: 4},
  { title: '공과', value: 5},
])

const noiseLabel = ref({
  0: '둔감',
  1: '민감',
  2: '보통',
})

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