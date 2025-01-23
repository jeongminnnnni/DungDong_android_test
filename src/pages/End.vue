<template>
  <BoxContainer>
    <SubTitle :title="title" :desc="desc"> </SubTitle>
    <v-row no-gutters justify="center">
      <div ref="captureRef">
        <ImageFrame :survey="survey"></ImageFrame>
      </div>
      <v-img
        :src="capturedImage"
        :width="300"
        aspect-ratio="1/1"
        cover
      ></v-img>
    </v-row>

    <v-row no-gutters justify="center" class="margin-48 | mt-10 | pl-14 | pr-14">
      <v-btn 
        @click="captureAndSetImage"
        color="#FF6161" rounded="xl" width="100%" 
        class="text-btn"
      >
        이미지 저장하기
      </v-btn>
    </v-row>

    <v-row no-gutters justify="center" class="margin-48 | mt-4 | pl-14 | pr-14">
      <v-btn 
        @click="submitSurvey"
        color="#FFFFFF" rounded="xl" width="100%" 
        class="w-text-btn"
      >
        다시하기
      </v-btn>
    </v-row>

    <v-row no-gutters justify="center" class="margin-48 | mt-4 | pl-14 | pr-14">
      <v-btn 
        @click="submitSurvey"
        color="#FFFFFF" rounded="xl" width="100%" 
        class="w-text-btn"
      >
        룸메찾기 알리기
      </v-btn>
    </v-row>



  </BoxContainer>
</template>

<script setup>
// ----- 선언부 ----- //
import { onMounted, onUnmounted, onBeforeMount, ref, computed, watch} from "vue";
import { useRouter, useRoute } from "vue-router";
import { routes } from "@/router"
import axios from "axios";
import html2canvas from "html2canvas";

import BoxContainer from "@/components/BoxContainer.vue";
import ImageFrame from "@/components/ImageFrame.vue";

const title = '짜잔! 결과 이미지가 나왔어요.'
const desc = '이미지를 저장하고 공유하여<br>마음에 맞는 룸메이트를 구해보세요.'

const captureRef = ref(null); // 캡처할 컴포넌트의 참조
const capturedImage = ref(''); // 캡처된 이미지의 URL 저장

const survey = ref({
  dorm:  null,
  birth: null,
  studentId: null,
  college: "",
  mbti: "",
  smoke: null,
  drink: "",
  sdEtc: "",
  wakeUp: "",
  lightOff: "",
  bedTime: "",
  sleepHabit: 0,
  clean: 0,
  bug: 0,
  eatIn: 0,
  noise: 0,
  share: 0,
  home: 0,
  tags: [],
  notes: "",
  selectTag: []
});

// ----- 라이프 사이클 ----- //
onBeforeMount(() => {


});


onMounted(() => {
  loadSurveyData();
});

onUnmounted(() => {

})

// ----- 함수 정의 ----- //

function loadSurveyData() {
  const existingSurvey = localStorage.getItem('userSurvey');
  console.log('get existingSurvey', existingSurvey);

  if (existingSurvey) {
    const parsedSurvey = JSON.parse(existingSurvey);
    
    // 데이터 매핑 및 할당
    survey.value.dorm = parsedSurvey.dorm || "";
    survey.value.birth = parsedSurvey.birth || 0;
    survey.value.studentId = parsedSurvey.studentId || 0;
    survey.value.college = parsedSurvey.college || "";
    survey.value.mbti = parsedSurvey.mbti || "";
    survey.value.smoke = parseSmokeStatus(parsedSurvey.smoke || 0);
    survey.value.drink = parseDrinkFormat(parsedSurvey.drink);
    survey.value.sdEtc = parsedSurvey.sdEtc || "";
    survey.value.wakeUp = parsedSurvey.wakeUp || "00:00";
    survey.value.lightOff = parsedSurvey.lightOff || "00:00";
    survey.value.bedTime = parsedSurvey.bedTime || "00:00";
    survey.value.sleepHabit = parsedSurvey.sleepHabit || 0;
    survey.value.clean = parsedSurvey.clean || 0;
    survey.value.bug = parsedSurvey.bug || 0;
    survey.value.eatIn = parsedSurvey.eatIn || 0;
    survey.value.noise = parsedSurvey.noise || 0;
    survey.value.share = parsedSurvey.share || 0;
    survey.value.home = parsedSurvey.home || 0;
    survey.value.notes = parsedSurvey.notes || "";
    survey.value.selectTag = parsedSurvey.selectTag || [];

    console.log('set survey object', survey.value);
  }
}

function parseDrinkFormat(drink) {
  if (!drink) return "0주에 0번";  // 기본값 설정

  const parts = drink.split('-');  // 'ab-c-de'를 '-'로 분리
  if (parts.length !== 3) return "0주에 0번";  // 형식이 맞지 않는 경우 기본값 반환

  // 정수 변환을 사용해 앞자리 '0' 제거
  const ab = parseInt(parts[0], 10);  // 'ab' 정수로 변환하여 앞자리 '0' 제거
  const c = parseInt(parts[1], 10);  // 'c' 정수로 변환
  const de = parseInt(parts[2], 10);  // 'de' 정수로 변환하여 앞자리 '0' 제거

  // 'c'의 값에 따라 '일', '개월', '년', '주' 단위 결정
  let unit;
  switch (c) {
    case 0:
      unit = "일";
      break;
    case 1:
      unit = "개월";
      break;
    case 2:
      unit = "년";
      break;
    case 3:
      unit = "주";  // 주 단위 추가
      break;
    default:
      unit = "일";  // 기본값 설정
  }

  return `${ab}${unit}에 ${de}번`;
}

function parseSmokeStatus(smoke) {
  switch (smoke) {
    case 0:
      return "비흡연자";
    case 1:
      return "흡연자(연초)";
    case 2:
      return "흡연자(전자담배)";
    default:
      return "비흡연자";  // 기본값 설정
  }
}

function captureAndSetImage() {
  if (captureRef.value) {
    html2canvas(captureRef.value).then(canvas => {
      capturedImage.value = canvas.toDataURL('image/png');
    }).catch(error => {
      console.error('Error capturing image:', error);
    });
  }
}


// const submitSurvey = async () => {
//   const scriptURL = "1pnk6bSmCt5eo3bQ3NvOv87fY3xZ-RaeHFqFFDXEnxf6NVZmMzs8Z4b9n"; // Google Apps Script URL
//   try {
//     const response = await axios.post(scriptURL, userSurvey.value, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("Google Sheet response:", response.data);
//   } catch (error) {
//     console.error("Error sending data to Google Sheet:", error);
//   }
// };

</script>

<style scoped>
.text-btn {
  color: #FFF;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.w-text-btn {
  color: #000;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.5px;
}

</style>